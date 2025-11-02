import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    env: {
      BURGER_API_URL: 'https://norma.education-services.ru/api'
    },
    setupNodeEvents(on, config) {}
  }
});
