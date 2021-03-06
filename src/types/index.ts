export type RedisExecuteRequestResult = "success" | "failure";
export type RedisEvent = "connect" | "ready" | "error" | "close" | "reconnecting" | "end";

export interface CommandLineParsed {
    redis_command: string;
    redis_arguments: string[];
    command_line: string;
    valid: boolean;
    error?: string;
}
export interface MessageEventList {
    e2w_connection_state: EventDataConnection;
    w2e_redis_execute_request: EventDataRedisExecuteRequest;
    e2w_redis_execute_response: EventDataRedisExecuteResponse;
    w2e_webview_ready: boolean;
    w2e_log_request: boolean;
    e2w_log_response: LogItem[];
    e2w_redis_event: RedisEvent;
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
    initial: boolean;
}
export interface EventDataRedisExecuteRequest {
    id: string;
    command: CommandLineParsed;
}

export interface EventDataRedisExecuteResponse {
    id: string;
    result: any;
    time: number;
    error?: string;
}

export interface ProcMessage {
    name: ProcMessageType;
    data: any;
}
export interface ProcMessageStrict<T extends keyof MessageEventList> extends ProcMessage {
    name: T;
    data: MessageEventList[T];
}

export interface LogItem {
    id: string;
    command: string;
    arguments: string;
}
