import { ActionFunctionArgs } from '@remix-run/node';

import { languageAction } from '~/.server/controllers/language.controller';

export const action = async (args: ActionFunctionArgs) => {
  return languageAction(args);
};
