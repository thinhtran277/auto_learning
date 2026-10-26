import { test as base, chromium, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { CheckboxesPage } from "../pages/checkboxes.page";
import { DropdownPage } from "../pages/dropdown.page";
import { StatusCodePage } from "../pages/statusCode.page";
import { MultiDropdownPage } from "../pages/multiDropdown.page";
import { UploadFilePage } from "../pages/uploadFile.page";

type PomFixtures = {
  cdpPage: Page;
  loginPage: LoginPage;
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  statuscodePage: StatusCodePage;
  multidropdownPage: MultiDropdownPage;
  uploadFilePage: UploadFilePage;
};

export const test = base.extend<PomFixtures>({
  // A new tab in a Chrome opened by hand (CDP_URL), so Cloudflare sees a normal browser
  cdpPage: async ({}, use) => {
    const browser = await chromium.connectOverCDP(process.env.CDP_URL!);
    const page = await browser.contexts()[0].newPage();
    await use(page);
    await page.close();
    await browser.close();
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  checkboxesPage: async ({ page }, use) => {
    await use(new CheckboxesPage(page));
  },

  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },

  statuscodePage: async ({ page }, use) => {
    await use(new StatusCodePage(page));
  },

  uploadFilePage: async ({ page }, use) => {
    await use(new UploadFilePage(page));
  },

  // Picked at load time so the CDP run does not also launch Playwright's own browser
  multidropdownPage: process.env.CDP_URL
    ? async ({ cdpPage }, use) => {
        await use(new MultiDropdownPage(cdpPage));
      }
    : async ({ page }, use) => {
        await use(new MultiDropdownPage(page));
      },
});

export { expect } from "@playwright/test";
