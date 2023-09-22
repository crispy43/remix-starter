import { cssBundleHref } from '@remix-run/css-bundle';
import { json, type LinksFunction, type LoaderArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import clsx from 'clsx';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next';

import { NonFlashOfWrongThemeEls, ThemeProvider, useTheme } from '~/hooks/use-theme';
import i18next from '~/localization/i18next.server';
import { getThemeSession } from '~/services/theme.server';
import globalStyles from '~/styles/global.css';
import resetStyles from '~/styles/reset.css';

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await i18next.getLocale(request);
  const themeSession = await getThemeSession(request);

  return json({ locale, theme: themeSession.getTheme() });
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: resetStyles },
  { rel: 'stylesheet', href: globalStyles },
  ...cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [],
];

const RemixDevTools = process.env.NODE_ENV === 'development'
  ? lazy(() => import('remix-development-tools'))
  : null;

const App = () => {
  const { locale, theme: serverSideTheme } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const [theme] = useTheme();

  useChangeLanguage(locale);

  return (
    <html
      lang={locale}
      dir={i18n.dir()}
      className={clsx(theme)}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(serverSideTheme)} />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `process = ${JSON.stringify(
              { env: {} },
            )}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {RemixDevTools ? <Suspense><RemixDevTools /></Suspense> : null}
      </body>
    </html>
  );
};

export default function AppWithProviders() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <App />
    </ThemeProvider>
  );
}