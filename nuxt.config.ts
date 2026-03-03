import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-04-01',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Nuxt Vite Rolldown CSS Repro',
    },
  },
});

