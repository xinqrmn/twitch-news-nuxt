// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  root: true,
  env: {
    browser: true,
    node: true,
  },
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
