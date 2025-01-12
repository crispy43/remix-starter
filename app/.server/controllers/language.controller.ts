import { FromSchema } from 'json-schema-to-ts';

import ajv from '~/lib/ajv';
import { updateLanguageSchema } from '~/schemas/language';

import { isLanguage } from '../lib/localization';
import { invalidError, json, parseFormData } from '../lib/utils';
import { getLanguageSession } from '../services/session';

export const updateLanguage = async (request: Request) => {
  const languageSession = await getLanguageSession(request);
  const payload = await parseFormData<FromSchema<typeof updateLanguageSchema>>(request);
  const validate = ajv.compile(updateLanguageSchema);
  const valid = validate(payload);
  if (!valid) {
    return invalidError(validate.errors!);
  }
  if (!isLanguage(payload.language)) {
    return json(
      { message: `language value of ${payload.language} is not a valid language.` },
      { status: 400 },
    );
  }
  languageSession.setLanguage(payload.language);

  return new Response(null, {
    status: 204,
    headers: { 'Set-Cookie': await languageSession.commit() },
  });
};
