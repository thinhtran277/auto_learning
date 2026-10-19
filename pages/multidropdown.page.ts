import { expect, type Locator, type Page } from "@playwright/test";

export class MultiDropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.getByRole("combobox");
  }

  async open() {
    await this.page.goto("https://output.jsbin.com/osebed/2", { waitUntil: "domcontentloaded" });
  }

  async selectOption(option: string) {
    await this.dropdown.selectOption(option);
  }

  async expectSelectedOption(option: string) {
    await expect(this.dropdown).toHaveValue(option);
  }
}
