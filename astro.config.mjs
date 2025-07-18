import { defineConfig } from 'astro/config';
import path from 'node:path';

export default defineConfig({
  alias: {
    '@': path.resolve('./src'),
  },
});
