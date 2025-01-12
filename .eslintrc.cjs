/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ['!**/.server', '!**/.client'],

  // Base config
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['simple-import-sort', 'unused-imports'],

  overrides: [
    // React
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
        'import/resolver': {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },

    // Node
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],

  // Custom rules
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-console': [
      'warn',
      {
        allow: ['info', 'warn', 'error', 'test'],
      },
    ],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'array-bracket-spacing': ['error', 'never'],
    'array-callback-return': 'error',
    'object-shorthand': ['error', 'always'],
    'arrow-spacing': 'error',
    'switch-colon-spacing': 'error',
    'block-spacing': 'error',
    'semi-spacing': ['error', { before: false, after: true }],
    'computed-property-spacing': ['error', 'never'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'func-call-spacing': ['error', 'never'],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/boolean-prop-naming': 'warn',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-pascal-case': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-key': 'warn',
    'react/self-closing-comp': 'error',
    'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-equals-spacing': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-indent': ['error', 2, { indentLogicalExpressions: false }],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-space-before-closing': 'error',
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      },
    ],
  },
};
