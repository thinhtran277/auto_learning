import { expect, type Locator, type Page } from "@playwright/test";

export class StatusCodePage {
  readonly page: Page;
  readonly statusCode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.statusCode = page.getByText("Status Codes");
  }

  async open() {
    await this.page.goto("https://the-internet.herokuapp.com/status_codes", { waitUntil: "domcontentloaded" });
  }

  async navigate200() {
    await this.page.getByRole("link", { name: "200" }).click();
  }

  async expect200() {
    await expect(this.page).toHaveURL("https://the-internet.herokuapp.com/status_codes/200");
    await expect(this.page.getByText("This page returned a 200 status code.")).toBeVisible();
  }

  async backToStatusCodesList() {
    await this.page.getByRole("link", { name: "here" }).click();
  }

  async navigate301() {
    await this.page.getByRole("link", { name: "301" }).click();
  }

  async expect301() {
    await expect(this.page).toHaveURL("https://the-internet.herokuapp.com/status_codes/301");
    await expect(this.page.getByText("This page returned a 301 status code.")).toBeVisible();
  }

  async navigate404() {
    await this.page.getByRole("link", { name: "404" }).click();
  }
  async expect404() {
    await expect(this.page).toHaveURL("https://the-internet.herokuapp.com/status_codes/404");
    await expect(this.page.getByText("This page returned a 404 status code.")).toBeVisible();
  }

  async navigate500() {
    await this.page.getByRole("link", { name: "500" }).click();
  }

  async expect500() {
    await expect(this.page).toHaveURL("https://the-internet.herokuapp.com/status_codes/500");
    await expect(this.page.getByText("This page returned a 500 status code.")).toBeVisible();
  }

}
