import { ProcMessage } from "../../../src/types/index";

export interface VscodeMessageData<T> {
    command: string;
    data: T;
}
export interface VscodeMessageInterface {
    postMessage: <T>(data: ProcMessage) => void;
}
