// TODO: JSON Schema로 파라미터 타입 정의하고 Ajv로 유효성 검사
// https://github.com/ThomasAribart/json-schema-to-ts#readme
// https://ajv.js.org/

export const updateLanguageSchema = {
  type: 'object',
  properties: {
    language: {
      type: 'string',
      description: 'The language code to set.',
    },
  },
  required: ['language'],
  additionalProperties: false,
} as const;
