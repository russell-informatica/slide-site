// @ts-check
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Deployed as a GitHub Pages project site at
  site: 'https://marini-didattica.github.io',
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
