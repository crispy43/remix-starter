import { Theme } from '~/common/constants';
import { isTheme } from '~/hooks/use-theme';

import { json } from '../lib/utils';
import { getThemeSession } from '../services/session';

export const updateTheme = async (request: Request) => {
  const themeSession = await getThemeSession(request);
  const { theme } = (await request.json()) as { theme: Theme };
  if (!isTheme(theme)) {
    return json(
      { error: `theme value of ${theme} is not a valid theme.` },
      { status: 400 },
    );
  }
  themeSession.setTheme(theme);

  return new Response(null, {
    status: 204,
    headers: { 'Set-Cookie': await themeSession.commit() },
  });
};
