import * as fs from "fs-extra";
import * as path from "path";
import { Workspace } from "../workspace";

export class RedisLog {

    constructor(private workspace: Workspace) {

        const root = this.workspace.getSingleRootPath();
        const logPath = path.join(root, ".redisConsole.log");

        fs.ensureFile(logPath)
            .then((result) => {
                console.log("OK");
            }).catch((e) => {
                console.log(e);
            });

    }
    public append(line: string) {

    }

}
