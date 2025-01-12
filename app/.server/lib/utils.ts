import { ErrorObject } from 'ajv';

// * FormData 객체 추출
export const parseFormData = async <T = any>(request: Request) => {
  const formData = await request.formData();
  return Object.fromEntries(formData) as T;
};

// * JSON 응답 생성 (Remix에서 json 함수가 deprecated 됨에 따라 대체)
export const json = (data: any, options?: ResponseInit) => {
  return new Response(JSON.stringify(data), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

// * Ajv 유효성 검사 에러 응답
export const invalidError = (errors: ErrorObject[]) => {
  return json(
    {
      message: `${errors[0].instancePath} ${errors[0].message}`,
      error: errors,
    },
    { status: 400 },
  );
};
