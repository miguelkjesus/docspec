import { defineConfig } from 'eslint/config'

import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default defineConfig([
  // Ignore generated files
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Base rules
  js.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports
            ['^\\u0000'],

            // External packages
            ['^@?\\w'],

            // Internal aliases
            ['^@/'],

            // Relative imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },

  // Must come after all configs as this turns off any rules that will conflict with prettier
  prettier,
])
