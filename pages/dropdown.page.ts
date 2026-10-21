import { type Locator, type Page } from "@playwright/test";

export class DropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;
  readonly url = "https://the-internet.herokuapp.com/dropdown";

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.getByRole("combobox");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async selectOption(option: string) {
    await this.dropdown.selectOption(option);
  }
}
