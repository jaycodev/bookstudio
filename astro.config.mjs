import { defineConfig, envField } from 'astro/config'
import path from 'node:path'

export default defineConfig({
  alias: {
    '@': path.resolve('./src'),
    '@assets': path.resolve('./src/assets'),
    '@utils': path.resolve('./src/assets/js/shared/utils'),
    '@components': path.resolve('./src/components'),
    '@layouts': path.resolve('./src/layouts'),
    '@views': path.resolve('./src/views'),
    '@pages': path.resolve('./src/pages'),
  },
    env: {
    schema: {
      PUBLIC_API_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'http://localhost:8080',
      }),
    },
  },
})
