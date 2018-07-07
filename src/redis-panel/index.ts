import * as path from "path";
import { fromEventPattern, ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

import * as vscode from "vscode";
import { RedisLog } from "../log";
import { RedisClient } from "../redis-client/index";
import { EventDataRedisExecuteRequest, ProcMessage, ProcMessageStrict, ProcMessageType, RedisConsoleConfig } from "../types";
import { generateHtml } from "./html";

export class RedisPanel {
    public static opened: boolean = false;
    public panel: vscode.WebviewPanel = null;
    private redis: RedisClient = null;

    private eventDestroy = new Subject<void>();
    private eventMessage = new Subject<ProcMessage>();
    private stateWebviewReady = new ReplaySubject<void>(1);

    constructor(
        private context: vscode.ExtensionContext,
        private config: RedisConsoleConfig,
        private log: RedisLog,
    ) {
        this.redis = new RedisClient(this.config);
        this.panel = vscode.window.createWebviewPanel("redis-console", "Redis console", vscode.ViewColumn.Beside, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restric the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, "ng")),
            ],
            retainContextWhenHidden: true,

        });
        this.panel.onDidDispose(() => {
            RedisPanel.opened = false;
            this.eventDestroy.next();
        }, null, context.subscriptions);

        this.panel.webview.html = generateHtml(this.context.extensionPath, this.config);
        // this.panel.webview.postMessage({ command: "refactor" });

        fromEventPattern<ProcMessage>((f: (e: any) => any) => {
            return this.panel.webview.onDidReceiveMessage(f, null, context.subscriptions);
        }, (f: any, d: vscode.Disposable) => {
            d.dispose();
        }).pipe(
            takeUntil(this.eventDestroy),
        ).subscribe((m) => {
            this.eventMessage.next(m);
            this.onMessage(m);

        });

    }
    public start() {

        this.panel.reveal();

        RedisPanel.opened = true;

        this.stateWebviewReady.pipe(
            take(1),
        ).subscribe(() => {

            const tstart = Date.now();

            this.redis.connect()
                .then(() => {
                    const data: ProcMessageStrict<"e2w_connection_state"> = {
                        name: "e2w_connection_state",
                        data: {
                            state: true,
                            time: Date.now() - tstart,
                        },
                    };
                    this.panel.webview.postMessage(data);

                }).catch((e) => {
                    const data: ProcMessageStrict<"e2w_connection_state"> = {
                        name: "e2w_connection_state",
                        data: {
                            state: false,
                            time: Date.now() - tstart,
                            error: e,
                        },
                    };
                    this.panel.webview.postMessage(data);

                });
        });
    }
    public reveal() {
        return this.panel.reveal();
    }
    public end() {
        this.panel.dispose();
    }
    private onMessage(message: ProcMessage) {
        console.error("Message received in obervable");
        console.error(message);
        const name = message.name as ProcMessageType;
        switch (name) {
            case "w2e_redis_execute_request":
                this.onRedisExecuteRequest(message.data);
                break;
            case "w2e_webview_ready":
                this.stateWebviewReady.next();
                break;
            case "w2e_log_request":
                this.onLogRequest();
                break;
        }
    }
    private onLogRequest() {
        this.log.read()
            .then((result) => {
                const response: ProcMessageStrict<"e2w_log_response"> = {
                    name: "e2w_log_response",
                    data: result,
                };
                this.panel.webview.postMessage(response);

            }).catch((e) => {
                console.error(e);
            });
    }
    private onRedisExecuteRequest(data: EventDataRedisExecuteRequest) {

        const tstart = Date.now();

        this.redis.execute(data.command)
            .then((result) => {
                console.log("result is...");
                console.log(result);
                const response: ProcMessageStrict<"e2w_redis_execute_response"> = {
                    name: "e2w_redis_execute_response",
                    data: {
                        id: data.id,
                        result,
                        time: Date.now() - tstart,
                    },
                };
                this.panel.webview.postMessage(response);

                return this.log.append(data);

            }).then(() => {
                console.log("Log appended");
            }).catch((e: any) => {
                console.log(e);
                const response: ProcMessageStrict<"e2w_redis_execute_response"> = {
                    name: "e2w_redis_execute_response",
                    data: {
                        id: data.id,
                        result: null,
                        time: Date.now() - tstart,
                        error: e.message || e,
                    },
                };
                this.panel.webview.postMessage(response);
            });
    }
}
