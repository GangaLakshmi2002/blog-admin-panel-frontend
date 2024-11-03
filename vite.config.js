import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: `${import.meta.env.VITE_API_BASE_URL}`,
        secure: false
      }
    }
  },
  plugins: [react()],
})

  // target:'https://blog-admin-panel-backend.onrender.com',