import { type Locator, type Page } from "@playwright/test";

export class DetectBrokenImagesPage {
  readonly page: Page;
  readonly images: Locator;
  readonly url = "https://the-internet.herokuapp.com/broken_images";

  constructor(page: Page) {
    this.page = page;
    this.images = page.locator("img");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async getImageSources(): Promise<string[]> {
    const sources: string[] = [];

    // Go through every <img> on the page and read its src attribute
    for (const image of await this.images.all()) {
      const src = await image.getAttribute("src");
      if (src) {
        sources.push(src);
      }
    }

    return sources;
  }

  async getStatusCode(src: string): Promise<number> {
    // Turn "asdf.jpg" or "/img/x.svg" into a full URL on the same site
    const fullUrl = new URL(src, this.url).href;

    // Send a GET request for the image, without opening it in the browser
    const response = await this.page.request.get(fullUrl);

    return response.status();
  }
}
