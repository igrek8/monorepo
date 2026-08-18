import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    silent: true,
    clearMocks: true,
    projects: ['packages/*'],
    coverage: {
      reporter: ['lcov', 'html'],
    },
  },
});
