import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    outDir: './build'
  },
  resolve: {
    alias: [
      {
        find: 'common',
        replacement: path.resolve(__dirname, 'src/common'),
      },
    ],
  },
  plugins: [react(), tsconfigPaths()],
})
