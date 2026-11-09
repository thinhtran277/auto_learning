import { test as base } from "@playwright/test";
import { DownloadMultiplePage } from "../pages/downloadMultiple.page";

export const test = base.extend<{ downloadMultiplePage: DownloadMultiplePage }>({
  downloadMultiplePage: async ({ page }, use) => {
    await use(new DownloadMultiplePage(page));
  },
});
