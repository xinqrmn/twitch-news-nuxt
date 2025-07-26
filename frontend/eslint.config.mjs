import createConfigForNuxt from '@nuxt/eslint-config'
import globals from 'globals'

export default createConfigForNuxt({
  languageOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  ignores: ['node_modules', 'dist', '.nuxt'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': ['error'],
  },
})
