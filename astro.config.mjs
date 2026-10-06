// @ts-check
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Deployed as a GitHub Pages project site at
  // https://russell-informatica.github.io/slide-site/
  site: 'https://russell-informatica.github.io',
  base: '/slide-site',
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
