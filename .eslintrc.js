module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'off',
    'no-use-before-define': 'off',
    'max-len': [1, 120, 4, { ignoreUrls: true }],
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
