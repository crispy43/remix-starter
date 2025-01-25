import { ActionFunctionArgs } from '@remix-run/node';
import { FromSchema } from 'json-schema-to-ts';

import { updateLanguageSchema } from '~/.server/schemas/language';
import { replaceT } from '~/lib/utils';

import { InvalidException, MethodNotAllowedException } from '../lib/exception';
import { isLanguage, localizedError } from '../lib/localization';
import { validateFormData } from '../lib/utils';
import { getLanguageSession } from '../services/session.service';

export const languageAction = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case 'POST': {
      const payload = await validateFormData<FromSchema<typeof updateLanguageSchema>>(
        request,
        updateLanguageSchema,
      );
      if (!isLanguage(payload.language)) {
        const t = await localizedError(request);
        throw new InvalidException(
          replaceT(t.invalid, { path: t.word.language, value: payload.language }),
        );
      }
      const languageSession = await getLanguageSession(request);
      languageSession.setLanguage(payload.language);
      return new Response(null, {
        status: 204,
        headers: { 'Set-Cookie': await languageSession.commit() },
      });
    }

    default: {
      throw new MethodNotAllowedException();
    }
  }
};
