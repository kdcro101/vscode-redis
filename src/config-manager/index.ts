import { RedisConsoleConfig } from "../types";
import { Workspace } from "../workspace";

export class ConfigManager {

    constructor(private workspace: Workspace) {
    }

    public get(): RedisConsoleConfig {
        const out: RedisConsoleConfig = {
            host: this.workspace.read("host"),
            port: this.workspace.read("port"),
            hostIpFamily: this.workspace.read("hostIpFamily"),
            password: this.workspace.read("password"),
        };

        return out;
    }
    public save(config: RedisConsoleConfig): void {
        this.workspace.write("host", config.host);
        this.workspace.write("port", config.port);
        this.workspace.write("password", config.password);
        this.workspace.write("hostIpFamily", config.hostIpFamily);

    }
}
