import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import parser from '@angular-eslint/template-parser';
import unicorn from 'eslint-plugin-unicorn';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.app.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@angular-eslint': angular,
      '@typescript-eslint': typescript,
      'unicorn': unicorn
    },
    rules: {
      ...angular.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...unicorn.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/catch-error-name': ['error', { name: 'error' }],
      'unicorn/prefer-top-level-await': 'off'
    }
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: parser
    },
    plugins: {
      '@angular-eslint/template': angularTemplate
    },
    rules: angularTemplate.configs.recommended.rules
  }
];
