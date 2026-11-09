import { type Locator, type Page } from "@playwright/test";

export class DownloadMultiplePage {
  readonly page: Page;
  readonly fileLink: (fileName: string) => Locator;
  readonly url = "https://the-internet.herokuapp.com/download";

  constructor(page: Page) {
    this.page = page;
    this.fileLink = (fileName) => page.getByRole("link", { name: fileName, exact: true }).first();
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async downloadFile(fileName: string): Promise<string> {
    // 1. Start listening for the download BEFORE clicking, or the event is missed
    const downloadPromise = this.page.waitForEvent("download");

    // 2. Click the link whose text is exactly the file name
    await this.fileLink(fileName).click();

    // 3. Wait for the download to arrive
    const download = await downloadPromise;

    // 4. Read the real name of the file the browser received
    const downloadedName = download.suggestedFilename();

    // 5. Save it into the download folder under that real name
    await download.saveAs("download/" + downloadedName);

    return downloadedName;
  }
}
