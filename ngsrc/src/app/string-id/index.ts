import sampleSize from "lodash-es/sampleSize";

export function generateId(): string {
    return sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 16).join("");
}
export function requestId(operationId: string) {
    return `request-${operationId}`;
}
export function responseId(operationId: string) {
    return `response-${operationId}`;
}
