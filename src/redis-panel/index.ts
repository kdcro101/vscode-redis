import * as path from "path";
import * as vscode from "vscode";
import { generateHtml } from "./html";

export interface RedisClientConfig {
    host: string;
    port: number;
    username: string;
    password: string;
}

export class RedisPanel {
    public panel: vscode.WebviewPanel = null;
    public config: RedisClientConfig = null;

    constructor(private context: vscode.ExtensionContext) {
        const ws = vscode.workspace.getConfiguration();

        this.config = {
            host: ws.get("redis-console.host"),
            port: ws.get("redis-console.port"),
            username: ws.get("redis-console.username"),
            password: ws.get("redis-console.password"),
        };

        this.panel = vscode.window.createWebviewPanel("redis-console", "Redis console", vscode.ViewColumn.Three, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restric the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, "ng")),
            ],

        });

        this.panel.webview.html = generateHtml(this.context.extensionPath, this.config);

    }
    public open() {
        this.panel.reveal();
    }
    public close() {
        this.panel.dispose();
    }
}
