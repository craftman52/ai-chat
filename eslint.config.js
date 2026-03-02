import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // 忽略文件配置
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      'coverage',
      '*.config.js',
      '*.config.ts',
      '.eslintcache',
    ],
  },
  
  // 全局配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin,
      'jsx-a11y': jsxA11y,
      prettier: prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ESLint 推荐规则
      ...js.configs.recommended.rules,
      
      // TypeScript 推荐规则
      ...tseslint.configs.recommended.rules,
      
      // React 推荐规则
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      
      // React Hooks 规则
      ...reactHooks.configs.recommended.rules,
      
      // JSX Accessibility 规则
      ...jsxA11y.configs.recommended.rules,
      
      // 自定义规则
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      
      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      
      // React Refresh 规则
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // Prettier 规则
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
  
  // 针对测试文件的配置
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  
  // 应用 Prettier 配置（必须在最后）
  eslintConfigPrettier
);