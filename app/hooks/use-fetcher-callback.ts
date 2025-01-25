import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';

// * useFetcher의 응답 데이터를 콜백으로 전달해 실행하는 래퍼 훅
export const useFetcherCallback = <T>(callback: (data: T) => void) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      callback(fetcher.data as T);
    }
  }, [callback, fetcher]);

  return fetcher;
};
