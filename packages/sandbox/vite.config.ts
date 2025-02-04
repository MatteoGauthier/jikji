import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    entries: ['@jikji/react'],
  },
  resolve: {
    alias: {
      '@jikji/react': path.resolve(require.resolve('@jikji/react/package.json'), "../src"),
      'components': path.resolve(require.resolve('@jikji/react/package.json'), "../src/components"),
      'core': path.resolve(require.resolve('@jikji/react/package.json'), "../src/core"),
    }
  }
})
