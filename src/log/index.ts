import * as fs from "fs-extra";
import * as _ from "lodash";
import * as path from "path";
import { EventDataRedisExecuteRequest } from "../types";
import { Workspace } from "../workspace";

export class RedisLog {
    private logPath: string = null;
    constructor(private workspace: Workspace) {

        const root = this.workspace.getSingleRootPath();
        this.logPath = path.join(root, ".redisConsole.log");

        fs.ensureFile(this.logPath)
            .then((result) => {
                console.log("OK");
            }).catch((e) => {
                console.log(e);
            });

    }
    public append(data: EventDataRedisExecuteRequest): Promise<void> {
        return new Promise((resolve, reject) => {
            const c = data.command.redis_command;
            const a = data.command.redis_arguments.join(" ");
            fs.appendFile(this.logPath, `${c} ${a}\n`)
                .then(() => {
                    return this.cutLog();
                }).then(() => {
                    resolve();
                }).catch((e) => {
                    reject(e);
                });

        });
    }
    public read(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.logPath)
                .then((result) => {
                    const data = result.toString();
                    if (data == null || data.length === 0) {
                        resolve([]);
                        return;
                    }
                    const rows = data.split("\n").filter((line) => line.trim() !== "");
                    if (rows.length === 0) {
                        resolve([]);
                        return;
                    }
                    resolve(rows);

                }).catch((e) => {
                    reject(e);
                });
        });
    }
    private cutLog(len: number = 500) {
        return new Promise((resolve, reject) => {

            fs.readFile(this.logPath)
                .then((result) => {
                    const data = result.toString();
                    if (data == null || data.length === 0) {
                        resolve();
                        return;
                    }
                    const rows = data.split("\n").filter((line) => line.trim() !== "");
                    if (rows.length === 0 || rows.length <= len) {
                        resolve();
                        return;
                    }

                    const last = _.takeRight(rows, len);

                    fs.writeFile(this.logPath, last.join("\n"))
                        .then(() => {
                            resolve();
                        }).catch((e) => {
                            reject(e);
                        });

                }).catch((e) => {
                    reject(e);
                });

        });
    }

}
