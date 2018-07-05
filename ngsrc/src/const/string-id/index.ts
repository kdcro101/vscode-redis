import sampleSize from "lodash-es/sampleSize";

export function generateId(): string {
  return sampleSize("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 16).join("");
}
