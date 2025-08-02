import { defineConfig } from 'eslint/config'
import neostandard from 'neostandard'

export default defineConfig([
  {
    extends: [neostandard({ ignores: ['dist/**/*'] })]
  },
  {
    languageOptions: {
      ecmaVersion: 2025,
    }
  },
])
