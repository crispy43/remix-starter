// TODO: JSON Schema로 파라미터 타입 정의하고 Ajv로 유효성 검사
// https://github.com/ThomasAribart/json-schema-to-ts#readme
// https://ajv.js.org/

import { FromSchema } from 'json-schema-to-ts';

export const updateLanguageSchema = {
  type: 'object',
  properties: {
    language: {
      type: 'string',
      description: '변경하려는 언어 코드',
    },
  },
  required: ['language'],
  additionalProperties: false,
} as const;

export type UpdateLanguage = FromSchema<typeof updateLanguageSchema>;
