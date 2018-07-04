import * as vscode from "vscode";
export class Workspace {
    public getSingleRootPath(): string {
        return vscode.workspace.workspaceFolders[0].uri.fsPath;
    }

    public isMultiRootWorkspace(): boolean {
        return vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 1;
    }
}
