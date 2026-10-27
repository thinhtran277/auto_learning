import { test as base, chromium, Page } from "@playwright/test";
import { MultiDropdownPage } from "../pages/multiDropdown.page";

type MultiDropdownFixtures = {
  cdpPage: Page;
  multidropdownPage: MultiDropdownPage;
};

export const test = base.extend<MultiDropdownFixtures>({
  // A new tab in a Chrome opened by hand (CDP_URL), so Cloudflare sees a normal browser
  cdpPage: async ({}, use) => {
    const browser = await chromium.connectOverCDP(process.env.CDP_URL!);
    const page = await browser.contexts()[0].newPage();
    await use(page);
    await page.close();
    await browser.close();
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
