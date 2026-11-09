import { test as base } from "@playwright/test";
import { DownloadSinglePage } from "../pages/downloadSingle.page";

export const test = base.extend<{ downloadSinglePage: DownloadSinglePage }>({
  downloadSinglePage: async ({ page }, use) => {
    await use(new DownloadSinglePage(page));
  },
});
