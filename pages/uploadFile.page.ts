import { type Locator, type Page } from "@playwright/test";

export class UploadFilePage {
  readonly page: Page;
  readonly url = "https://the-internet.herokuapp.com/upload";
  readonly choosefile: Locator;
  readonly upload: Locator;
  readonly uploadedTitle: Locator;
  readonly uploadedFiles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.choosefile = page.getByRole("button", { name: "Choose File" });
    this.upload = page.getByRole("button", { name: "Upload" });
    this.uploadedTitle = page.getByRole("heading", { name: "File Uploaded!" });
    this.uploadedFiles = page.locator("#uploaded-files");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async chooseFile() {
    await this.choosefile.setInputFiles("test-data/file-sample_150kB.pdf");
  }

  async upLoad() {
    await this.upload.click();
  }
}
