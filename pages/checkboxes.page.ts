import { expect, type Locator, type Page } from "@playwright/test";

export class CheckboxesPage {
  readonly page: Page;
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;

  constructor(page: Page) {
    this.page = page;
    // Checkbox không có <label> nên không lọc theo name được, lấy theo thứ tự
    this.checkbox1 = page.getByRole("checkbox").nth(0);
    this.checkbox2 = page.getByRole("checkbox").nth(1);
  }

  async open() {
    await this.page.goto("https://the-internet.herokuapp.com/checkboxes", { waitUntil: "domcontentloaded" });
  }

  async checkBox1() {
    await this.checkbox1.check();
  }

  async checkBox2() {
    await this.checkbox2.check();
  }

  async expectBox1Checked() {
    await expect(this.checkbox1).toBeChecked();
  }

  async expectBox2Checked() {
    await expect(this.checkbox2).toBeChecked();
  }
}
