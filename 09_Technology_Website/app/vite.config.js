import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// base:'./' → relative asset paths (works on GitHub Pages subfolders + local)
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
