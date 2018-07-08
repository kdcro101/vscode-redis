import * as fs from "fs-extra";
import * as _ from "lodash";
import * as path from "path";
import { EventDataRedisExecuteRequest, LogItem } from "../types";
import { Workspace } from "../workspace";

export class RedisLog {
    private logPath: string = null;
    private logLast: LogItem = null;

    constructor(private workspace: Workspace) {

        const root = this.workspace.getSingleRootPath();
        this.logPath = path.join(root, ".redisConsole.log");

        fs.ensureFile(this.logPath)
            .then((result) => {

            }).catch((e) => {
                console.log(e);
            });

    }
    public append(data: EventDataRedisExecuteRequest): Promise<void> {
        return new Promise((resolve, reject) => {

            const item: LogItem = {
                id: data.id,
                command: data.command.redis_command,
                arguments: data.command.redis_arguments.join(" "),
            };

            if (this.logLast && this.logLast.command === item.command && this.logLast.arguments === item.arguments) {
                resolve();
                return;
            }

            const str = JSON.stringify(item);

            fs.appendFile(this.logPath, `${str}\n`)
                .then(() => {
                    return this.cutLog();
                }).then(() => {
                    resolve();
                }).catch((e) => {
                    reject(e);
                });

        });
    }
    public read(): Promise<LogItem[]> {
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
                    const parsed = rows.map((i) => {
                        let o: LogItem = null;

                        try {
                            o = JSON.parse(i);
                        } catch (e) {
                            o = null;
                        }
                        return o;
                    }).filter((i) => i != null);

                    if (parsed.length > 0) {
                        this.logLast = parsed[parsed.length - 1];
                    }

                    resolve(parsed);

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
