import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import globalStyles from '~/styles/global.css?url';

import { getLanguageSession, getThemeSession } from './.server/services/session.service';
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from './hooks/use-theme';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getLanguage } = await getLanguageSession(request);
  const { getTheme } = await getThemeSession(request);
  return { lang: getLanguage(), ssrTheme: getTheme() };
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: globalStyles }];
};

export const App = () => {
  const { lang, ssrTheme } = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang={lang} className={theme ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(ssrTheme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function AppWithProviders() {
  const { ssrTheme } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={ssrTheme} themeAction="/api/theme">
      <App />
    </ThemeProvider>
  );
}
