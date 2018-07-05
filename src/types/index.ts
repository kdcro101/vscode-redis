export interface CommandLineParsed {
    redis_command: string;
    command_line: string;
    valid: boolean;
    error?: string;
}
export interface MessageEventList {
    e2w_connection_state: EventDataConnection;
    w2e_redis_execute_request: EventDataRedisExecuteRequest;
}

export interface RedisConsoleConfig {
    host: string;
    port: number;
    password: string;
    hostIpFamily: number;
}

export type ProcMessageType = keyof MessageEventList;

export interface EventDataConnection {
    state: boolean;
    time: number;
    error?: string;
}
export interface EventDataRedisExecuteRequest {
    id: string;
    command: string;
}

export interface ProcMessage {
    name: ProcMessageType;
    data: any;
}
export interface ProcMessageStrict<T extends keyof MessageEventList> extends ProcMessage {
    name: T;
    data: MessageEventList[T];
}
