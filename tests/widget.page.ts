import { expect, Locator, Page } from '@playwright/test';

const WidgetPageSelectors = {
  WRAPPER: '.sc-dino-typography-h > [class^="widget__"]',
  WIDGET_BODY: '[class^="widgetWrapper"] > [class^="widget__"]',
  HEADER_TEXT: 'header h5',
  BUTTON_OPEN: '[data-test="openWidget"]',
  ARTICLE_POPULAR_TITLE: '[class^="popularTitle__"]',
  ARTICLE_POPULAR_LIST: '[class^="popularTitle__"] ~ ul[class^="articles__"]',
  ARTICLE_POPULAR_LIST_ITEM: '[class^="popularTitle__"] ~ ul[class^="articles__"] > li',
} as const;

export class WidgetPage {
  static selector = WidgetPageSelectors;

  constructor(private readonly page: Page) {}

  wrapper(): Locator {
    return this.page.locator(WidgetPage.selector.WRAPPER);
  }

  widgetBody(): Locator {
    return this.page.locator(WidgetPage.selector.WIDGET_BODY);
  }

  title(): Locator {
    return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT);
  }

  openButton(): Locator {
    return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN);
  }

  writeToUsButton(): Locator {
    return this.wrapper().getByRole('button', { name: "написать нам"});
  }

  popularArticles(): Locator {
    return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
  }

  async openWidget(): Promise<void> {
    await this.openButton().click();
    await expect(this.widgetBody()).toBeVisible();
  }

    async openFirstPopularArticle(): Promise<void> {
    const firstArticle = this.popularArticles().first();
    await expect(firstArticle).toBeVisible();
    await firstArticle.click();
  }

  async clickWriteToUs(): Promise<void> {
    await expect(this.writeToUsButton()).toBeVisible();
    await this.writeToUsButton().click();
  }

  async handleCookieConsent(): Promise<void> {
    const cookieButton = this.page.getByText("ОК", {exact: true}).first();
    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click();
      await expect(cookieButton).toBeHidden();
    }
  }
}
