import { test as base } from "@playwright/test";
import { DetectBrokenImagesPage } from "../pages/detectBrokenImages.page";

export const test = base.extend<{ detectBrokenImagesPage: DetectBrokenImagesPage }>({
  detectBrokenImagesPage: async ({ page }, use) => {
    await use(new DetectBrokenImagesPage(page));
  },
});
