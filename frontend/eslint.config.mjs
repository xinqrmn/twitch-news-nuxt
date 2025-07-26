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
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignores: ['node_modules', 'dist', '.nuxt', 'app/components/ui/**'],
}).append({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'vue/require-default-prop': 'off'
  },
})
