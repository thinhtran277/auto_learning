import { type Locator, type Page } from "@playwright/test";

export class RightClickPage {
  readonly page: Page;
  readonly hotSpot: Locator;
  readonly url = "https://the-internet.herokuapp.com/context_menu";

  constructor(page: Page) {
    this.page = page;
    this.hotSpot = page.locator("#hot-spot");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async rightClickAndGetAlert() {
    let message = "";   // Register the handler before clicking, the alert opens during the click
    this.page.once('dialog', async dialog => {
      message = dialog.message();
      await dialog.dismiss();         
    });
    await this.hotSpot.click({ button: 'right' });
    return message;
  }
}
