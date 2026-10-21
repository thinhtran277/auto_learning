import { type Locator, type Page } from "@playwright/test";

export class MultiDropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;
  readonly url = "https://output.jsbin.com/osebed/2";

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.getByRole("listbox");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
    // wait for the Cloudflare check to be passed by hand
    await this.dropdown.waitFor({ timeout: 120_000 });
  }

  async selectOptions(options: string[]) {
    await this.dropdown.selectOption(options);
  }
}
