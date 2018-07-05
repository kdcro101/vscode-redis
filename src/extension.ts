"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from "vscode";
import { ConfigManager } from "./config-manager";
import { RedisLog } from "./log/index";
import { RedisPanel } from "./redis-panel/index";
import { Workspace } from "./workspace";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const workspace = new Workspace();
    const log = new RedisLog(workspace);
    const configManager = new ConfigManager(workspace);
    const config = configManager.get();
    let redisPanel: RedisPanel = null;

    // save to expose config in workspace settings
    configManager.save(config);

    const disposable = vscode.commands.registerCommand("extension.startConsole", () => {
        if (RedisPanel.opened) {
            redisPanel.reveal();
            return;
        }
        redisPanel = new RedisPanel(context, config);
        redisPanel.start();
    });

    context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}
