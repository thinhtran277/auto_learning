import { expect, type Locator, type Page } from "@playwright/test";

export class MultiDropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.getByRole("listbox");
  }

  async open() {
    await this.page.goto("https://output.jsbin.com/osebed/2", { waitUntil: "domcontentloaded" });
    // wait for the Cloudflare check to be passed by hand
    await this.dropdown.waitFor({ timeout: 120_000 });
  }

  async selectOptions(options: string[]) {
    await this.dropdown.selectOption(options);
  }

  async expectSelectedOptions(values: string[]) {
    await expect(this.dropdown).toHaveValues(values);
  }
}
