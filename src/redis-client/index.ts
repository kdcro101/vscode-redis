import * as Redis from "ioredis";
import { BehaviorSubject, fromEventPattern, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { CommandLineParsed, RedisConsoleConfig, RedisEvent } from "../types";

const eventsList: RedisEvent[] = [
    "close",
    "connect",
    "end",
    "error",
    "ready",
    "reconnecting",
];

export class RedisClient {
    public client: Redis.Redis = null;
    public eventEmitted = new Subject<RedisEvent>();
    public stateReady = new BehaviorSubject<boolean>(false);
    private eventDestroy = new Subject<void>();

    constructor(private config: RedisConsoleConfig) {
        this.client = new Redis({
            lazyConnect: true,
            host: config.host,
            port: config.port,
            password: config.password === "" ? null : config.password,
            enableReadyCheck: false,
            reconnectOnError: (err) => {
                return true;
            },
            retryStrategy: (times) => {
                const delay = 3000;
                if (times > 20) {
                    return null;
                }
                return delay;
            },
        });

        eventsList.forEach((e) => {
            fromEventPattern((f: (e: any) => any) => {
                return this.client.on(e, f);
            }, (f: (e: any) => any) => {
                return this.client.off(e, f);
            }).pipe(
                takeUntil(this.eventDestroy),
            ).subscribe(() => {
                console.log("[client] ", e);
                this.eventEmitted.next(e);
            });

        });

        this.eventEmitted.pipe(
            takeUntil(this.eventDestroy),
            filter((e) => e === "ready"),
        ).subscribe(() => this.stateReady.next(true));

        this.eventEmitted.pipe(
            takeUntil(this.eventDestroy),
            filter((e) => e === "close"),
        ).subscribe(() => this.stateReady.next(false));

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
    public execute(command: CommandLineParsed) {
        return new Promise((resolve, reject) => {
            // command needs to be lowercase to be parsed HGETALL -> hgetall
            this.client.send_command(command.redis_command.toLowerCase(), ...command.redis_arguments)
                .then((result) => {
                    resolve(result);
                }).catch((e) => {
                    reject(e);
                });
        });
    }
    public on(event: RedisEvent, cb: () => void) {
        return this.client.on(event, cb);
    }
    public off(event: RedisEvent, cb: () => void) {
        return this.client.off(event, cb);
    }
    public destroy() {
        this.client.disconnect();
        this.eventDestroy.next();
    }

}
