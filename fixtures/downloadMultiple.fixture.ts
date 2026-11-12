import { test as base } from "@playwright/test";
import { DownloadMultiplePage } from "../pages/downloadMultiplePage";

export const test = base.extend<{ downloadMultiplePage: DownloadMultiplePage }>({
  downloadMultiplePage: async ({ page }, use) => {
    await use(new DownloadMultiplePage(page));
  },
});
