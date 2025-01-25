import { ActionFunctionArgs } from '@remix-run/node';

import { themeAction } from '~/.server/controllers/theme.controller';

export const action = async (args: ActionFunctionArgs) => {
  return themeAction(args);
};
