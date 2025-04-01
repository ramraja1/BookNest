import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Exposes the server to the network
    port: 5173, // Keeps the default Vite port
    strictPort: true, // Ensures it doesn't switch to another port
  },
});
