import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import updatePages from './plugins/update-pages.js'

export default defineConfig({
  // updatePages maakt van elk bestand in src/pages/ automatisch een
  // HTML-pagina (zie plugins/update-pages.js).
  plugins: [react(), updatePages()],
  // Relatieve paden zodat de site ook op een subpad werkt
  base: './',
})
