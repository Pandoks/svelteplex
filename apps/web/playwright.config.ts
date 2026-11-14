import { defineConfig } from '@playwright/test';

const port = 4174;

// NOTE: avoid nested `pnpm` under Playwright's webServer. Concurrent `pnpm run` + nested
// `pnpm build`/`pnpm exec` deadlocks under pnpm 12.6 (e2e hangs after "Running 1 test using 1
// worker").
export default defineConfig({
  timeout: 60_000,
  expect: { timeout: 15_000 },
  webServer: {
    command: `vite build && vite preview --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI
  },
  use: {
    baseURL: `http://localhost:${port}`,
    navigationTimeout: 30_000,
    actionTimeout: 15_000
  },
  testDir: 'e2e'
});
