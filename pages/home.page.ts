import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole("link", { name: "Get started" });
  }

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Playwright/);
    await expect(this.getStartedLink).toBeVisible();
  }

  async openGettingStarted(): Promise<void> {
    await this.getStartedLink.click();
  }
}
