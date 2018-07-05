import * as path from "path";
import { fromEventPattern, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import * as vscode from "vscode";
import { RedisClient } from "../redis-client/index";
import { ProcMessageStrict, RedisConsoleConfig } from "../types";
import { generateHtml } from "./html";

export class RedisPanel {
    public static opened: boolean = false;
    public panel: vscode.WebviewPanel = null;
    private redis: RedisClient = null;

    private eventDestroy = new Subject<void>();

    constructor(
        private context: vscode.ExtensionContext,
        private config: RedisConsoleConfig,
    ) {
        this.redis = new RedisClient(this.config);
        this.panel = vscode.window.createWebviewPanel("redis-console", "Redis console", vscode.ViewColumn.Three, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restric the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, "ng")),
            ],
            retainContextWhenHidden: true,

        });

        this.panel.webview.html = generateHtml(this.context.extensionPath, this.config);
        // this.panel.webview.postMessage({ command: "refactor" });

        fromEventPattern((f: (e: any) => any) => {
            return this.panel.webview.onDidReceiveMessage(f, null, context.subscriptions);
        }, (f: any, d: vscode.Disposable) => {
            d.dispose();
        }).pipe(
            takeUntil(this.eventDestroy),
        ).subscribe((m) => {
            console.error("Message received in obervable");
        });

        this.panel.webview.onDidReceiveMessage((message) => {
            console.log(message);
        }, null, context.subscriptions);

        this.panel.onDidDispose(() => {
            RedisPanel.opened = false;
            this.eventDestroy.next();
        }, null, context.subscriptions);
    }
    public start() {

        this.panel.reveal();

        RedisPanel.opened = true;
        const tstart = Date.now();

        this.redis.connect()
            .then((result) => {
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
    }
    public reveal() {
        return this.panel.reveal();
    }
    public end() {
        this.panel.dispose();
    }
}
