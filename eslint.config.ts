import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: [
      '**/*.{js,mjs,cjs}',
      '!lib/**/*',
      '!dist/**/*',
      '!src/e2e.cjs',
      '!**/*.ts',
    ],
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
    },
  },
  // TypeScript source files only (not config files)
  {
    files: ['src/**/*.ts', 'bin/emoji-cli-improved.ts'],
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
  // Configuration files (TypeScript but no type checking)
  {
    files: ['eslint.config.ts', 'vitest.config.ts', 'tsup.config.ts'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-prototype-builtins': 'off',
      'no-misleading-character-class': 'off',
    },
  },
])
