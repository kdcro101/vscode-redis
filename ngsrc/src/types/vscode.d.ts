
export interface VscodeMessageData<T> {
  command: string;
  data: T;
}
export interface VscodeMessageInterface {
  postMessage: <T>(data: VscodeMessageData<T>) => void;
}
