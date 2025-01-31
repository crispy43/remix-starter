import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';

// * useFetcher의 응답 데이터를 콜백으로 전달해 실행하는 래퍼 훅
export const useFetcherCallback = <T extends (...args: any[]) => ReturnType<T>>(
  callback: (data: Awaited<ReturnType<T>>) => void,
) => {
  const fetcher = useFetcher<Awaited<ReturnType<T>>>();

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      callback(fetcher.data as Awaited<ReturnType<T>>);
    }
  }, [callback, fetcher]);

  return fetcher;
};
