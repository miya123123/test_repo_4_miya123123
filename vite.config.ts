import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/flappy-bird-game/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})