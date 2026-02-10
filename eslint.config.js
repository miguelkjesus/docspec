import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import ts from 'typescript-eslint'

export default defineConfig([
  // Ignore generated files
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Base rules
  js.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,

  // TypeScript parser options for type-checked rules
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js', 'jest.config.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

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
