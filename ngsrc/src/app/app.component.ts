import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import renderjson from "renderjson";
import { fromEvent as observableFromEvent, Observable, Subject } from "rxjs";
import { catchError, concatMap, filter, map, tap } from "rxjs/operators";
import { EventDataRedisExecuteResponse } from "../../../src/types/index";
import {
    CommandLineParsed,
    EventDataConnection, ProcMessage, ProcMessageStrict, ProcMessageType, RedisConsoleConfig
} from "../../../src/types/index";
import { OutputItem, OutputItemStrict } from "../types";
import { VscodeMessageInterface } from "../types/vscode";
import { extractRedisCommand, extractRedisCommandArguments, isRedisCommand, isValidInput } from "./reference";
import { generateId, requestId, responseId } from "./string-id/index";

declare var codeFontFamily: string;
declare var redisConfig: RedisConsoleConfig;
declare var document: Document;
declare var window: Window;
declare var vscode: VscodeMessageInterface;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    @ViewChild("client") public client: ElementRef<HTMLDivElement>;
    @ViewChild("command") public command: ElementRef<HTMLInputElement>;

    public redisConfig: RedisConsoleConfig = redisConfig;
    public isDark: boolean = false;

    public commandLineCurrent: string = null;
    public commandLineError: boolean = false;
    public commandInProgress: boolean = false;
    // .....................
    public isConnected: boolean = false;
    public connectionDesc: string = "";
    public output: OutputItem[] = [];
    public eventMessage: Observable<MessageEvent> = null;
    public eventCommandChange: Observable<Event> = null;
    public eventCommandKeyup: Observable<KeyboardEvent> = null;
    public emitRedisExecute = new Subject<void>();

    constructor(
        private host: ElementRef<HTMLDivElement>,
        public change: ChangeDetectorRef,
        private zone: NgZone,
    ) {

        this.connectionDesc = `${this.redisConfig.host}:${this.redisConfig.port}`;
        (window as any).AppComponent = this;

        this.isDark =
            document.body.classList.contains("vscode-dark") || document.body.classList.contains("vscode-high-contrast") ? true : false;

        if (this.isDark) {
            this.host.nativeElement.classList.add("dark-theme");
        }

        renderjson.set_icons("+", "−");
        renderjson.set_show_to_level(1);

        this.eventMessage = observableFromEvent<MessageEvent>(window, "message");

        this.eventMessage.subscribe((event) => {
            this.onIncommingMessage(event);
        });

    }
    public trackById(index: number, item: OutputItem): string {
        return item.id;
    }
    ngOnInit() {
        console.error("ngOnInit");

        this.command.nativeElement.style.fontFamily = codeFontFamily;

        this.eventCommandChange = observableFromEvent(this.command.nativeElement, "change");
        this.eventCommandKeyup = observableFromEvent<KeyboardEvent>(this.command.nativeElement, "keyup");

        // check enter on input!
        this.eventCommandKeyup.pipe(
            filter((e) => e.keyCode === 13),
            filter(() => this.commandLineCurrent.length > 1),
        ).subscribe(() => this.emitRedisExecute.next());

        // check input validity
        this.eventCommandKeyup.pipe(
            // debounceTime(500),
            map<any, boolean>(() => {
                return isValidInput(this.commandLineCurrent);
            }),
        ).subscribe((isValid) => {
            this.commandLineError = isValid ? false : true;
            this.change.detectChanges();
        });

        // main execute emition
        this.emitRedisExecute.pipe(
            filter(() => this.commandLineCurrent.length > 1),
            tap(() => {
                this.commandInProgress = true;
                this.change.detectChanges();
            }),
            map<void, CommandLineParsed>(() => {
                const c = extractRedisCommand(this.commandLineCurrent);
                const a = extractRedisCommandArguments(this.commandLineCurrent);
                const isCommand = isRedisCommand(c);
                console.log(`comandline: ${this.commandLineCurrent} command: ${c} isValid: ${isCommand}`);
                if (isCommand) {
                    console.log(`Command ${c} is valid`);
                    return {
                        command_line: this.commandLineCurrent,
                        redis_command: c,
                        redis_arguments: a,
                        valid: true,
                    };
                } else {
                    console.log(`Command ${c} is INVALID`);
                    this.commandInProgress = false;
                    this.change.detectChanges();
                    throw new Error(`${c} is not valid command`);
                }
            }),
            tap<CommandLineParsed>((data) => {
                console.log("CommandLineParsed");
                console.log(data);
            }),
            filter((data) => data.valid === true),
            concatMap((data) => this.redisCommandExecute(data)),
            catchError((e, o) => {
                console.log(e);
                return o;
            })
        ).subscribe((e) => {
            console.log(e);

            this.commandInProgress = false;
            this.change.detectChanges();
            console.log("Execute done!");
        }, (e) => {
            this.commandInProgress = false;
            this.change.detectChanges();
            console.log(e);
        });

        window.addEventListener("message", event => {
            const message = event.data; // The JSON data our extension sent

        });

    }
    private onIncommingMessage(event: MessageEvent) {
        const message = event.data as ProcMessage;
        const name: ProcMessageType = message.name as ProcMessageType;

        console.error("onIncommingMessage");
        console.log(event);

        switch (name) {
            case "e2w_connection_state":
                this.onConnectionState(message.data as EventDataConnection);
                break;
        }
    }
    private onConnectionState(data: EventDataConnection) {
        this.isConnected = data.state;

        const id = generateId();
        const isError = data.error != null ? true : false;

        if (!isError) {
            const o: OutputItemStrict<"infoSuccess"> = {
                id,
                type: "infoSuccess",
                data: {
                    text: "Connected",
                    time: data.time,
                }
            };
            this.output.push(o);
        } else {
            const o: OutputItemStrict<"infoError"> = {
                id,
                type: "infoError",
                data: `Error connecting to ${this.connectionDesc}`,
            };
            this.output.push(o);
        }

        this.change.detectChanges();

    }
    private redisCommandExecute(command: CommandLineParsed) {
        return new Promise((resolve, reject) => {
            console.log(`redisCommandExecute: ${command.command_line}`);

            const id = generateId();
            const uiRequestId = requestId(id);

            const request: ProcMessageStrict<"w2e_redis_execute_request"> = {
                name: "w2e_redis_execute_request",
                data: {
                    id,
                    command,
                },
            };

            const outItemRequest: OutputItemStrict<"request"> = {
                id: uiRequestId,
                type: "request",
                data: {
                    command: `${command.redis_command}`,
                    args: `${command.redis_arguments.join(" ")}`,
                }
            };

            this.output.push(outItemRequest);
            this.change.detectChanges();
            this.scrollToBottom();

            vscode.postMessage(request);
            this.eventMessage.pipe(
                map<MessageEvent, ProcMessage>((event) => event.data),
                filter((data) => data.name === "e2w_redis_execute_response"),
                map<ProcMessage, ProcMessageStrict<"e2w_redis_execute_response">>((data) => {
                    return data as ProcMessageStrict<"e2w_redis_execute_response">;
                }),
                filter((data) => data.name === "e2w_redis_execute_response"),
                filter((data) => data.data.id === id),
                concatMap((data) => this.processRedisResponse(data.data)),
            ).subscribe(() => {
                this.scrollToBottom();
                resolve();
            }, (e) => {
                reject(e);
            });

        });
    }
    private processRedisResponse(data: EventDataRedisExecuteResponse): Promise<void> {
        return new Promise((resolve, reject) => {

            const uiRequestId = requestId(data.id);
            const uiResponseId = responseId(data.id);
            const requestIndex = this.output.findIndex((i) => i.id === uiRequestId);
            const oReq = (this.output[requestIndex] as OutputItemStrict<"request">);

            oReq.data.time = data.time;

            if (data.error == null) {

                oReq.data.resultType = "success";

                const outItemResponse: OutputItemStrict<"response"> = {
                    id: uiResponseId,
                    type: "response",
                    data: {
                        response: JSON.stringify(data.result),
                        time: data.time,
                    }
                };
                this.output.push(outItemResponse);
                this.change.detectChanges();
                const client = document.getElementById(`response-${data.id}-client`);

                let input: any = null;
                try {
                    input = JSON.parse(data.result);
                } catch (e) {
                    input = data.result;
                }

                const element = renderjson(input);
                element.style.fontFamily = codeFontFamily;
                client.appendChild(element);

            } else {

                oReq.data.resultType = "failure";
                this.change.detectChanges();

            }

            resolve();
        });
    }
    private scrollToBottom() {

        const e = this.client.nativeElement;
        const sh = e.scrollHeight;
        e.scrollTop = sh;

    }
}
