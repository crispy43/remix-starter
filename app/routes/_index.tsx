import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { localize } from '~/.server/lib/localization';
import { Theme } from '~/common/constants';
import { Button } from '~/components/ui/button';
import { useLanguage } from '~/hooks/use-language';
import { useTheme } from '~/hooks/use-theme';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await localize(request, 'welcome');
  return { t };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { t } = data;
  return [{ title: t.meta.title }, { name: 'description', content: t.meta.description }];
};

export default function Index() {
  const { t } = useLoaderData<typeof loader>();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-xl font-bold">{t.welcome}</h1>
      <div>
        <p>
          Current language:&nbsp;
          {language}
        </p>
        <Button onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}>
          {language === 'en' ? 'ko' : 'en'}
        </Button>
      </div>
      <div>
        <p>
          Current theme:&nbsp;
          {theme}
        </p>
        <Button onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}>
          {theme === Theme.DARK ? Theme.LIGHT : Theme.DARK}
        </Button>
      </div>
    </div>
  );
}
