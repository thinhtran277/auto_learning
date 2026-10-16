import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.flashMessage = page.locator("#flash");
  }

  async open(): Promise<void> {
    await this.page.goto("https://the-internet.herokuapp.com/login", { waitUntil: "domcontentloaded" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/\/secure$/);
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.flashMessage).toContainText("You logged into a secure area!");
  }

  async expectLoginFailed(message: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/login$/);
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.flashMessage).toContainText(message);
  }
}
