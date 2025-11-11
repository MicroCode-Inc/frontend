import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['color-functions', 'global-builtin', 'import']
      }
    }
  }
})