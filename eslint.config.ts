import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import json from '@eslint/json'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      // Allow Object.prototype methods
      'no-prototype-builtins': 'off',
      // Allow misleading character classes in regex
      'no-misleading-character-class': 'off',
      // Allow unused variables in generated/built files
      'no-unused-vars': 'off',
      // Allow require() in CommonJS files
      '@typescript-eslint/no-require-imports': 'off',
      // Allow some unused variables
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // TypeScript source files with type checking
  {
    files: ['src/**/*.ts', 'bin/**/*.ts'],
    plugins: {
      js,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    rules: {
      // Inherit base rules and override specific ones
      'no-prototype-builtins': 'off',
      'no-misleading-character-class': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.jsonc', '**/*.json'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
    rules: {}, // Override all inherited rules
  },
])
