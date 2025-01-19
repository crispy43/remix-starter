import { useRouteLoaderData } from '@remix-run/react';

import { loader as rootLoader } from '~/root';

import { useFetcherCallback } from './use-fetcher-callback';

export const useLanguage = () => {
  const { lang: language } = useRouteLoaderData<typeof rootLoader>('root');
  const fetcher = useFetcherCallback(({ message }) => message && console.error(message));

  const setLanguage = (lang: string) => {
    fetcher.submit({ language: lang }, { action: '/api/language', method: 'post' });
  };

  return [language, setLanguage] as const;
};
