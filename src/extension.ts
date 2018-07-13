import * as vscode from "vscode";
import { RedisPanel } from "./redis-panel";
import { Workspace } from "./workspace";

export function activate(context: vscode.ExtensionContext) {
    const workspace = new Workspace();

    let redisPanel: RedisPanel = null;

    const disposable = vscode.commands.registerCommand("extension.startConsole", () => {
        if (workspace.getSingleRootPath() == null) {
            vscode.window.showWarningMessage("Workspace is not opened");
            return;
        }
        if (RedisPanel.opened) {
            redisPanel.reveal();
            return;
        }
        redisPanel = new RedisPanel(context, workspace);
        redisPanel.start();
    });

    context.subscriptions.push(disposable);

}

export function deactivate() {
}
