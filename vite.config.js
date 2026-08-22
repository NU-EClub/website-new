import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://nu-eclub.github.io/website-new/
export default defineConfig({
  base: '/website-new/',
  plugins: [react()],
})
