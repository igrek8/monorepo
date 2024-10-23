import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
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
        '**/pgmcli-*.ts',
        '**/pgmcli.ts',
      ],
      reporter: ['lcov', 'html'],
    },
  },
});
