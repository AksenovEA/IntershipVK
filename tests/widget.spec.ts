import { test, expect } from '@playwright/test';
import { WidgetPage } from './widget.page';

test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);
    await page.goto('/');
    await widgetPage.handleCookieConsent();
  });

  test('opens widget', async () => {
    await widgetPage.openWidget();
    await expect(widgetPage.widgetBody()).toBeVisible();
  });

  test('opens support form with correct title', async () => {
    await widgetPage.openWidget();
    await widgetPage.openFirstPopularArticle();
    await widgetPage.clickWriteToUs();
    await expect(widgetPage.title()).toHaveText('Связь с поддержкой');
  });
});
