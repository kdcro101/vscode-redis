import { ChangeDetectionStrategy } from "@angular/compiler/src/core";
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import renderjson from "renderjson";
import { fromEvent as observableFromEvent, Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { EventDataConnection, ProcMessage, ProcMessageType, RedisConsoleConfig } from "../../../src/types/index";
import { generateId } from "../const/string-id/index";
import { OutputItem, OutputItemStrict } from "../types";
import { VscodeMessageInterface } from "../types/vscode";
import { commandReference } from "./reference";

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

    public commandCurrent: string = "abc";
    // .....................
    public isConnected: boolean = false;
    public connectionDesc: string = "";
    public output: OutputItem[] = [];
    public eventMessage: Observable<MessageEvent> = null;
    public eventCommandChange: Observable<Event> = null;
    public eventCommandKeyup: Observable<KeyboardEvent> = null;
    public emitRedisExecute = new Subject<void>();

    constructor(private host: ElementRef<HTMLDivElement>, public change: ChangeDetectorRef) {

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

        this.eventCommandKeyup.pipe(
            filter((e) => e.keyCode === 13),
            map<KeyboardEvent, string>(() => this.command.nativeElement.value),
            filter((s) => s.length > 1),
        ).subscribe((line) => this.redisCommandExecute(line));

        const element: HTMLDivElement = renderjson(
            {
                "glossary": {
                    "title": "example glossary",
                    "comprehensive": true,
                    "link": undefined,
                    "count": 1,
                    "GlossDiv": {
                        "title": "S",
                        "GlossList": {
                            "GlossEntry": {
                                "ID": "SGML",
                                "SortAs": "SGML",
                                "GlossTerm": "Standard Generalized Markup Language",
                                "Acronym": "SGML",
                                "Abbrev": "ISO 8879:1986",
                                "GlossDef": {
                                    "para": "A meta-markup language, used to create markup languages such as DocBook.",
                                    "GlossSeeAlso": ["GML", "XML"]
                                },
                                "GlossSee": "markup"
                            }
                        }
                    }
                }
            }
        );

        element.style.fontFamily = codeFontFamily;
        this.client.nativeElement.appendChild(element);

        window.addEventListener("message", event => {
            const message = event.data; // The JSON data our extension sent

        });
        vscode.postMessage({
            command: "alert",
            data: "on line ",
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
    private redisCommandExecute(commandLine: string) {
        console.log(`redisCommandExecute: ${commandLine}`);
    }
}
