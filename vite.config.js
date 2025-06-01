import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
server: {
  host: '0.0.0.0', // Ensure it binds to 0.0.0.0
  port: 5173, // Use Render's PORT variable or fallback to 5173
},
});
