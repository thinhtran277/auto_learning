import { type Locator, type Page } from "@playwright/test";

export class DownloadSinglePage {
  readonly page: Page;
  readonly downloadLink: Locator;
  readonly url = "https://the-internet.herokuapp.com/download";

  constructor(page: Page) {
    this.page = page;
    this.downloadLink = page.locator(".example a", { hasText: /^Screenshot.*\.png$/ }).first();
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async downloadFile(): Promise<string> {
    // 1. Start listening for the download BEFORE clicking, or the event is missed
    const downloadPromise = this.page.waitForEvent("download");

    // 2. Click the link to start the download
    await this.downloadLink.click();

    // 3. Wait for the download, then save it into the download folder
    const download = await downloadPromise;
    const filePath = "download/" + download.suggestedFilename();
    await download.saveAs(filePath);

    return filePath;
  }
}
