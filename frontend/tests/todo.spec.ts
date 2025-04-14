import { test, expect } from '@playwright/test';

test('can create a todo item', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Todoを記載' }).click();
  await page.getByRole('textbox', { name: 'Todoを記載' }).fill('test');
  await page.getByRole('button', { name: '追加' }).click();
});