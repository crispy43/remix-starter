import { ActionFunctionArgs } from '@remix-run/node';

import { updateLanguage } from '~/.server/controllers/language.controller';

export const action = async ({ request }: ActionFunctionArgs) => {
  return updateLanguage(request);
};
