import { defineConfig } from 'eslint/config'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.app.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,

      'prettier/prettier': 'error',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-alert': 'warn',

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react$', '^@?\\w'],
            ['^\\u0000'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\./'],
            ['\\.css$', '\\.scss$', '\\.less$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', '.build/**', 'public/vendor/**'],
  },
])
