import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    ignores: ['**/coverage/', '**/dist/', '**/build/', '**/.docusaurus/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
