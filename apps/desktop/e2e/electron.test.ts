import { _electron as electron, expect, test } from '@playwright/test';

test('app window has expected h1', async () => {
  // NOTE: CI's chrome-sandbox isn't setuid root, so Chromium can't sandbox there
  const app = await electron.launch({ args: ['--no-sandbox', '.'] });
  const window = await app.firstWindow();
  await expect(window.locator('h1')).toBeVisible();
  await app.close();
});
