import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relatieve paden zodat de site ook op een subpad werkt
  // (zoals GitHub Pages: gebruikersnaam.github.io/repo-naam/)
  base: './',
})
