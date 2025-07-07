import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/test_repo_4_miya123123/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})