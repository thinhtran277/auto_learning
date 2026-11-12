import { test as base } from "@playwright/test";
import { DownloadSinglePage } from "../pages/downloadSinglePage";

export const test = base.extend<{ downloadSinglePage: DownloadSinglePage }>({
  downloadSinglePage: async ({ page }, use) => {
    await use(new DownloadSinglePage(page));
  },
});
