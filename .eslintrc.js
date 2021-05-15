module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier'],
  plugins: ['prettier', 'import'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-tabs': 2,
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': [1, 'as-needed'],
    'array-callback-return': 2,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'import/no-unresolved': 2,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    indent: [2, 2, { SwitchCase: 1 }],
    'no-console': 1,
    'prefer-template': 2,
    'prefer-destructuring': 1,
  },
};
