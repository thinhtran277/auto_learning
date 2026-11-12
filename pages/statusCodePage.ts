import { type Locator, type Page } from "@playwright/test";

export class StatusCodePage {
  readonly page: Page;
  readonly url = "https://the-internet.herokuapp.com/status_codes";
  readonly link200: Locator;
  readonly link301: Locator;
  readonly link404: Locator;
  readonly link500: Locator;
  readonly backLink: Locator;
  readonly message200: Locator;
  readonly message301: Locator;
  readonly message404: Locator;
  readonly message500: Locator;

  constructor(page: Page) {
    this.page = page;
    this.link200 = page.getByRole("link", { name: "200" });
    this.link301 = page.getByRole("link", { name: "301" });
    this.link404 = page.getByRole("link", { name: "404" });
    this.link500 = page.getByRole("link", { name: "500" });
    this.backLink = page.getByRole("link", { name: "here" });
    this.message200 = page.getByText("This page returned a 200 status code.");
    this.message301 = page.getByText("This page returned a 301 status code.");
    this.message404 = page.getByText("This page returned a 404 status code.");
    this.message500 = page.getByText("This page returned a 500 status code.");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async navigate200() {
    await this.link200.click();
  }

  async navigate301() {
    await this.link301.click();
  }

  async navigate404() {
    await this.link404.click();
  }

  async navigate500() {
    await this.link500.click();
  }

  async backToStatusCodesList() {
    await this.backLink.click();
  }
}
