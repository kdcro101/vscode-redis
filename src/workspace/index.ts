import * as vscode from "vscode";
import { RedisConsoleConfig } from "../types";
export class Workspace {
    // private ws = vscode.workspace.getConfiguration();
    public getSingleRootPath(): string {
        try {
            return vscode.workspace.workspaceFolders[0].uri.fsPath;
        } catch (e) {
            return null;
        }
    }

    public isMultiRootWorkspace(): boolean {
        return vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 1;
    }
    public read<T extends keyof RedisConsoleConfig>(key: T): RedisConsoleConfig[T] {
        const ws = vscode.workspace.getConfiguration();
        const v: RedisConsoleConfig[T] = ws.get("redis-console." + key) as RedisConsoleConfig[T];
        return v;
    }
    public write<T extends keyof RedisConsoleConfig>(key: T, value: RedisConsoleConfig[T]): void {
        const ws = vscode.workspace.getConfiguration();
        ws.update("redis-console." + key, value, false);
    }
}
