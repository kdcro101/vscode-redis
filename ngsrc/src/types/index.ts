export interface OutputItemInfoSuccess {
    text: string;
    time: number;
}
export interface OutputItemResponse {
    response: string;
    time: number;
}
export interface OutputItemRequest {
    command: string;
    args: string;
    eventTime?: string;
}
export interface OutputItemTypes {
    infoSuccess: OutputItemInfoSuccess;
    infoError: string;
    request: OutputItemRequest;
    response: OutputItemResponse;
}
export interface OutputItem {
    id: string;
    type: string;
    data: any;
}
export interface OutputItemStrict<T extends keyof OutputItemTypes> extends OutputItem {
    id: string;
    type: T;
    data: OutputItemTypes[T];
}
