import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from the root of gokulnive.com, so base stays '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
