import { test as base } from "@playwright/test";
import { HorizontalSliderPage } from "../pages/horizontalSlider.page";

export const test = base.extend<{ horizontalSliderPage: HorizontalSliderPage }>({
  horizontalSliderPage: async ({ page }, use) => {
    await use(new HorizontalSliderPage(page));
  },
});
