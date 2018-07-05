import * as Redis from "ioredis";
import { RedisConsoleConfig } from "../types";

export class RedisClient {
    public client: Redis.Redis = null;

    constructor(private config: RedisConsoleConfig) {
        this.client = new Redis({
            lazyConnect: true,
            host: config.host,
            port: config.port,
            password: config.password === "" ? null : config.password,
        });

    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {

            if (this.client == null) {
                reject("no_client");
                return;
            }

            this.client.connect()
                .then((result) => {
                    resolve();
                }).catch((e) => {
                    reject(e);
                });

        });

    }

}
