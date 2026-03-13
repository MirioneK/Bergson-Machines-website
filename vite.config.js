import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Redirect all 404s to index.html so React Router handles navigation
    historyApiFallback: true,
  },
})
