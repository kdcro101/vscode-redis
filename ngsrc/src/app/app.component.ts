import { animate, style, transition, trigger } from "@angular/animations";
import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import renderjson from "renderjson";
import { BehaviorSubject, from as observableFrom, fromEvent as observableFromEvent, merge, Observable, ReplaySubject, Subject } from "rxjs";
import { catchError, concatMap, filter, map, takeUntil, tap } from "rxjs/operators";
import {
    CommandLineParsed, EventDataConnection, EventDataRedisExecuteResponse,
    LogItem, ProcMessage, ProcMessageStrict, ProcMessageType, RedisConsoleConfig, RedisEvent
} from "../../../src/types/index";
import { OutputItem, OutputItemStrict } from "../types";
import { VscodeMessageInterface } from "../types/vscode";
import { commandReference, extractRedisCommand, extractRedisCommandArguments, isRedisCommand, isValidInput } from "./reference";
import { CommandReferenceItem } from "./reference/index";
import { HelperService } from "./services/helper.service";
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
    animations: [
        trigger("animReference", [
            transition(":enter", [
                style({
                    transform: "scale3d(0.01,0.01,1)",
                    opacity: 0,
                }),
                animate("200ms ease-in-out", style({
                    transform: "scale3d(1,1,1)",
                    opacity: 1,
                })),
            ]),
            transition(":leave", [
                style({
                    transform: "scale3d(1,1,1)",
                    opacity: 1,
                }),
                animate("200ms ease-in-out", style({
                    transform: "scale3d(0.01,0.01,1)",
                    opacity: 0,
                })),
            ])
        ]),
        trigger("animLog", [
            transition(":enter", [
                style({
                    transform: "translate3d(0,100%,0)",
                    opacity: 0,
                }),
                animate("200ms ease-in-out", style({
                    transform: "translate3d(0,0,0)",
                    opacity: 1,
                })),
            ]),
            transition(":leave", [
                style({
                    transform: "translate3d(0,0,0)",
                    opacity: 1,
                }),
                animate("100ms ease-in-out", style({
                    transform: "translate3d(0,100%,0)",
                    opacity: 0,
                })),
            ])
        ])
    ]
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild("client") public client: ElementRef<HTMLDivElement>;
    @ViewChild("command") public command: ElementRef<HTMLInputElement>;

    public codeFont = codeFontFamily;
    public connectionData: EventDataConnection = null;
    public eventDestroyed = new Subject<void>();

    public commandList: CommandReferenceItem[] = commandReference;
    public commandControl = new FormControl();
    public stateInputEnabled = new BehaviorSubject<boolean>(false);

    private stateLog = new ReplaySubject<LogItem[]>(1);
    public logCurrent: LogItem[] = null;
    public logFiltered: Observable<LogItem[]>;

    public redisConfig: RedisConsoleConfig = redisConfig;
    public isDark: boolean = false;

    public commandLineCurrent: string = null;
    public commandLineError: boolean = false;
    public commandInProgress: boolean = false;
    public commandCurrent: string = null;
    // .....................
    public stateConnected = new BehaviorSubject<boolean>(false);
    public connectionDesc: string = "";
    public output: OutputItem[] = [];
    public eventMessage: Observable<MessageEvent> = null;
    public eventCommandChange: Observable<Event> = null;
    public eventCommandKeydown: Observable<KeyboardEvent> = null;
    public eventCommandFound = new Subject<string>();

    public emitRedisExecute = new Subject<void>();

    constructor(
        private host: ElementRef<HTMLDivElement>,
        public change: ChangeDetectorRef,
        public helper: HelperService,
    ) {

        this.connectionDesc = `${this.redisConfig.host}:${this.redisConfig.port}`;
        (window as any).AppComponent = this;

        this.isDark =
            document.body.classList.contains("vscode-dark") || document.body.classList.contains("vscode-high-contrast") ? true : false;

        if (this.isDark) {
            document.body.classList.add("dark-theme");
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
        // signal webview ready
        const eReady: ProcMessageStrict<"w2e_webview_ready"> = {
            name: "w2e_webview_ready",
            data: true,
        };
        vscode.postMessage(eReady);

        observableFrom(this.getLog())
            .subscribe(() => {
                this.change.detectChanges();
            });

        // -----------------------------------------------------
        merge(
            this.helper.stateCommandReference,
            this.helper.stateCommandLog
        ).subscribe(() => this.change.detectChanges());

        this.helper.eventLogExecute.pipe(

        ).subscribe((data) => {
            this.commandControl.setValue(`${data.command} ${data.arguments}`);
        });

        // style command font
        this.command.nativeElement.style.fontFamily = codeFontFamily;

        this.eventCommandChange = observableFromEvent(this.command.nativeElement, "change");
        this.eventCommandKeydown = observableFromEvent<KeyboardEvent>(this.command.nativeElement, "keydown");

        // check enter on input!
        merge(
            this.eventCommandKeydown.pipe(
                filter((e) => e.keyCode === 13),
            ),
            this.helper.eventCommandExecute,
        ).pipe(
            filter(() => this.commandLineCurrent.length > 1),
        ).subscribe(() => this.emitRedisExecute.next());

        merge(
            this.eventCommandKeydown.pipe(filter((e) => e.keyCode === 38)),
            observableFromEvent(this.command.nativeElement, "dblclick"),
        ).pipe(
            // takeUntil(this.eve)
        ).subscribe(() => this.helper.stateCommandLog.next(true));

        // check input validity
        // this.eventCommandKeydown.pipe(
        // debounceTime(500),
        this.commandControl.valueChanges.pipe(
            tap((line) => this.helper.stateInput.next(line)),
            tap((line) => console.log(`commandControl.valueChanges = ${line}`)),
            tap((line) => this.commandLineCurrent = line),
            map<string, boolean>((line) => {
                const valid = isValidInput(line);
                if (valid) {
                    this.commandCurrent = extractRedisCommand(line);
                } else {
                    this.commandCurrent = null;
                }
                this.eventCommandFound.next(this.commandCurrent);
                return valid;
            }),
        ).subscribe((isValid) => {
            this.commandLineError = isValid ? false : true;
            this.change.detectChanges();
        }, (e) => {
            console.error(e);
        });

        // main execute emition
        this.emitRedisExecute.pipe(
            filter(() => this.commandLineCurrent.length > 1),
            tap(() => {
                this.inputDisable();
                this.commandInProgress = true;
                this.change.detectChanges();
            }),
            map<void, CommandLineParsed>(() => {
                const c = extractRedisCommand(this.commandLineCurrent);
                const a = extractRedisCommandArguments(this.commandLineCurrent);
                const isCommand = isRedisCommand(c);
                if (isCommand) {
                    return {
                        command_line: this.commandLineCurrent,
                        redis_command: c,
                        redis_arguments: a,
                        valid: true,
                    };
                } else {
                    this.inputEnable();
                    this.commandInProgress = false;
                    this.change.detectChanges();
                    throw new Error(`${c} is not valid command`);
                }
            }),
            filter((data) => data.valid === true),
            concatMap((data) => this.redisCommandExecute(data)),
            catchError((e, o) => {
                console.log(e);
                return o;
            })
        ).subscribe((e) => {

            this.inputEnable();
            this.commandInProgress = false;
            this.commandLineReset();

            this.change.detectChanges();
        }, (e) => {
            this.inputEnable();
            this.commandInProgress = false;
            this.change.detectChanges();
        });

        this.stateConnected.pipe(
            takeUntil(this.eventDestroyed)
        ).subscribe((s) => {
            if (s) {
                this.inputEnable();
            } else {
                this.inputDisable();
            }
        });
    }
    ngOnDestroy() {
        this.eventDestroyed.next();
    }
    private onIncommingMessage(event: MessageEvent) {
        const message = event.data as ProcMessage;
        const name: ProcMessageType = message.name as ProcMessageType;

        switch (name) {
            case "e2w_connection_state":
                this.onConnectionState(message.data as EventDataConnection);
                break;
            case "e2w_redis_event":
                this.onRedisEvent(message.data as RedisEvent);
                break;

        }
    }
    private onConnectionState(data: EventDataConnection) {

        this.connectionData = data;
        this.stateConnected.next(data.state);

        const id = generateId();
        const isError = data.error != null ? true : false;

        if (isError && data.initial) {
            const o: OutputItemStrict<"infoError"> = {
                id,
                type: "infoError",
                data: "Unable to connect...",
            };
            this.output.push(o);
        }

        this.change.detectChanges();

    }
    private redisCommandExecute(command: CommandLineParsed) {
        return new Promise((resolve, reject) => {

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
                concatMap(() => this.getLog()),
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
                const outItemError: OutputItemStrict<"infoError"> = {
                    id: uiResponseId,
                    type: "infoError",
                    data: data.error,
                };
                this.output.push(outItemError);
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
    public outputClear = () => {
        this.output = [];
        this.change.detectChanges();
    }
    public commandLineReset() {
        this.commandControl.setValue("");
        this.change.detectChanges();
    }

    private getLog(): Promise<LogItem[]> {
        return new Promise((resolve, reject) => {

            const logReq: ProcMessageStrict<"w2e_log_request"> = {
                name: "w2e_log_request",
                data: true,
            };
            vscode.postMessage(logReq);

            this.eventMessage.pipe(
                map<MessageEvent, ProcMessage>((event) => event.data),
                filter((data) => data.name === "e2w_log_response"),
                map<ProcMessage, ProcMessageStrict<"e2w_log_response">>((data) => {
                    return data as ProcMessageStrict<"e2w_log_response">;
                }),
                map((data) => data.data),
            ).subscribe((log) => {
                this.logCurrent = log;
                this.stateLog.next(log);
                resolve(log);
            }, (e) => {
                this.logCurrent = [];
                this.stateLog.next([]);
                reject(e);
            });

        });
    }
    private onRedisEvent(e: RedisEvent) {
        console.log("redisEvent");
        console.log(e);

        const id = generateId();
        switch (e) {
            case "close":
                const close: OutputItemStrict<"infoError"> = {
                    id,
                    type: "infoError",
                    data: `Connection closed`,
                };
                this.output.push(close);
                break;
            case "reconnecting":
                const reconnecting: OutputItemStrict<"infoSuccess"> = {
                    id,
                    type: "infoSuccess",
                    data: {
                        text: "Reconnecting..."
                    }
                };
                this.output.push(reconnecting);
                break;
            case "ready":
                const ready: OutputItemStrict<"infoSuccess"> = {
                    id,
                    type: "infoSuccess",
                    data: {
                        text: "Connected"
                    }
                };
                this.output.push(ready);
                break;
        }

        this.change.detectChanges();
    }
    public inputDisable() {
        this.commandControl.disable();
        this.stateInputEnabled.next(false);
        this.change.detectChanges();
    }
    public inputEnable() {
        this.commandControl.enable();
        this.stateInputEnabled.next(true);
        this.change.detectChanges();
        this.command.nativeElement.focus();
    }
}
