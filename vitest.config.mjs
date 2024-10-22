import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/dist',
        '**/coverage/**',
        '**/build/**',
        '**/docs/**',
        '**/examples/**',
        '**/migrations/**',
        '**/index.ts',
      ],
      reporter: ['lcov', 'html'],
    },
  },
});
