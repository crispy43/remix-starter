// * JSON 직렬화 타입 추론
export type ToJson<T> = T extends string | number | boolean | null
  ? T // 기본 타입은 그대로 반환
  : T extends undefined
  ? never // undefined는 반환하지 않음
  : T extends (...args: any[]) => any
  ? never // 함수는 반환하지 않음
  : T extends Date
  ? string // Date는 ISO 문자열로 변환
  : T extends Array<infer U>
  ? Array<ToJson<U>> // 배열은 재귀적으로 변환
  : {
      [K in keyof T]: T[K] extends string | number | boolean | null
        ? T[K] // 기본 타입은 그대로 반환
        : T extends undefined
        ? never // undefined는 반환하지 않음
        : T[K] extends (...args: any[]) => any
        ? never // 함수는 반환하지 않음
        : T[K] extends Date
        ? string // Date는 ISO 문자열로 변환
        : T[K] extends Array<infer U>
        ? Array<ToJson<U>> // 배열은 재귀적으로 변환
        : T[K] extends Record<string, any>
        ? ToJson<T[K]> // 객체는 재귀적으로 변환
        : unknown; // 그 외는 unknown으로 처리
    };
