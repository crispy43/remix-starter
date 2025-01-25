import { ActionFunctionArgs } from '@remix-run/node';

import { themeAction } from '~/.server/controllers/theme.controller';
import { control } from '~/.server/lib/utils';

export const action = async (args: ActionFunctionArgs) => {
  return control(themeAction, args);
};
