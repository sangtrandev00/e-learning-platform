/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname
  },
  plugins: ['react-refresh', 'prettier', 'react'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-non-null-assertion': 'off'
    // 'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    // 'prettier/prettier': [
    //   'warn',
    //   {
    //     arrowParens: 'always',
    //     trailingComma: 'none',
    //     tabWidth: 2,
    //     endOfLine: 'auto',
    //     useTabs: false,
    //     singleQuote: true,
    //     printWidth: 120,
    //     jsxSingleQuote: true
    //   }
    // ]
  }
};
