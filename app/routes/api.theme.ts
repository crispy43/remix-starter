import { ActionFunctionArgs } from '@remix-run/node';

import { updateTheme } from '~/.server/controllers/theme.controller';

export const action = async ({ request }: ActionFunctionArgs) => {
  return updateTheme(request);
};
