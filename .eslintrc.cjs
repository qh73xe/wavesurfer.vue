module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint' ],
  rules: {
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true },
        ObjectPattern: { multiline: true },
        ImportDeclaration: { multiline: true },
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'func-call-spacing': 'off', // Fix for 'defineEmits'
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: { 'import/no-extraneous-dependencies': 'off' },
    },
  ],
};
