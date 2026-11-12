import { type Locator, type Page } from "@playwright/test";

export class CheckboxesPage {
  readonly page: Page;
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;
  readonly url = "https://the-internet.herokuapp.com/checkboxes";

  constructor(page: Page) {
    this.page = page;
    // Checkbox doesn't have <label>, so can not follow name, should follow order
    this.checkbox1 = page.getByRole("checkbox").nth(0);
    this.checkbox2 = page.getByRole("checkbox").nth(1);
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async checkBox1() {
    await this.checkbox1.check();
  }

  async checkBox2() {
    await this.checkbox2.check();
  }
}
