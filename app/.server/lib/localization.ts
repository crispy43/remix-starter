import { resolveAcceptLanguage } from 'resolve-accept-language';

import { DEFAULT_LANGUAGE, LANGUAGES } from '~/common/constants';

import { getLanguageSession } from '../services/session';

// * language 코드
export const getAcceptLanguage = (request: Request) => {
  return (
    (
      resolveAcceptLanguage(
        request.headers.get('accept-language')!,
        LANGUAGES,
        DEFAULT_LANGUAGE,
      ) as unknown as string
    )?.split('-')[0] ?? DEFAULT_LANGUAGE
  );
};

// * language 검증
export const isLanguage = (language: string) =>
  LANGUAGES.map((lang) => lang.split('-')[0]).includes(language);

// * 현지화 번역 언어셋
export const localize = async (request: Request, namespace = 'common') => {
  const languageSession = await getLanguageSession(request);
  const language = languageSession.getLanguage();
  const commonTranslations = await import(`../../locales/${language}/common.json`);
  if (namespace === 'common') {
    return commonTranslations.default;
  } else {
    const pageTranslations = await import(`../../locales/${language}/${namespace}.json`);
    return { ...commonTranslations.default, ...pageTranslations.default };
  }
};
