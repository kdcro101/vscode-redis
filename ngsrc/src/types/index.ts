export interface OutputItemInfoSuccess {
  text: string;
  time: number;
}
export interface OutputItemTypes {
  infoSuccess: OutputItemInfoSuccess;
  infoError: string;
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
