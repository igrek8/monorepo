import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...defaultExclude,
        '**/bin/**',
        '**/docs/**',
        '**/coverage/**',
        '**/build/**',
        '**/*.d.ts',
        '**/*.test-d.ts',
        '**/examples/**',
        '**/index.ts',
      ],
      reporter: ['lcov', 'html'],
    },
  },
});
