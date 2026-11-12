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

  // Step 3 + 4: get all <img> elements and read the src of each one
  async getImageSources(): Promise<string[]> {
    const sources: string[] = [];

    const allImages = await this.images.all();
    for (const image of allImages) {
      const src = (await image.getAttribute("src")) ?? "";
      sources.push(src);
    }

    return sources;
  }

  // Step 5: send a GET request to the image link and return its status code
  async getStatusCode(src: string): Promise<number> {
    // new URL() joins the src with the page address, e.g. https://the-internet.herokuapp.com/asdf.jpg
    const imageUrl = new URL(src, this.url).href;
    const response = await this.page.request.get(imageUrl);

    return response.status();
  }
}
