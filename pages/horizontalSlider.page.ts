import { type Locator, type Page } from "@playwright/test";

export class HorizontalSliderPage {
  readonly page: Page;
  readonly slider: Locator;
  readonly rangeValue: Locator;
  readonly url = "https://the-internet.herokuapp.com/horizontal_slider";

  constructor(page: Page) {
    this.page = page;
    this.slider = page.locator('input[type="range"]');
    this.rangeValue = page.locator("#range");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async getValue(): Promise<number> {
    return Number(await this.rangeValue.textContent());
  }

  async setValue(target: number) {
    await this.slider.focus();
    // Guard against an endless loop if the slider stops responding
    for (let i = 0; i < 10 && (await this.getValue()) < target; i++) {
      await this.slider.press("ArrowRight");
    }
  }
}
