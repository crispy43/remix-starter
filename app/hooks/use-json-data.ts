import { useActionData, useLoaderData } from '@remix-run/react';

// * JSON 타입 추론 useLoaderData 래퍼
export const useJsonLoaderData = <T extends (...args: any[]) => ReturnType<T>>() => {
  return useLoaderData() as Awaited<ReturnType<T>>;
};

// * JSON 타입 추론 useActionData 래퍼
export const useJsonActionData = <T extends (...args: any[]) => ReturnType<T>>() => {
  return useActionData() as Awaited<ReturnType<T>>;
};
