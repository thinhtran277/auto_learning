import { type Locator, type Page } from "@playwright/test";

export class DragAndDropPage {
  readonly page: Page;
  readonly columnA: Locator;
  readonly columnB: Locator;
  readonly url = "https://the-internet.herokuapp.com/drag_and_drop";

  constructor(page: Page) {
    this.page = page;
    this.columnA = page.locator("#column-a");
    this.columnB = page.locator("#column-b");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async dragAndDrop() {
    await this.columnA.dragTo(this.columnB);
  }
}
