import { defineConfig } from 'astro/config'
import path from 'node:path'

export default defineConfig({
  alias: {
    '@': path.resolve('./src'),
    '@components': path.resolve('./src/components'),
    '@layouts': path.resolve('./src/layouts'),
    '@views': path.resolve('./src/views'),
    '@pages': path.resolve('./src/pages'),
  },
})
