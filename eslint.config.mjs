import { defineConfig } from 'eslint/config'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-alert': 'warn',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', '.build/**', '.astro/**'],
  },
])
