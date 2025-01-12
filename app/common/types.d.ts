// * JSON 직렬화 타입 추론
export type ToJson<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? never
    : T[K] extends Date
    ? string
    : T[K] extends Array<infer U>
    ? Array<ToJSON<U>>
    : T[K] extends Record<string, any>
    ? ToJSON<T[K]>
    : T[K];
};
