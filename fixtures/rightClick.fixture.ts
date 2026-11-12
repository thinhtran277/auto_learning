import { test as base } from "@playwright/test";
import { RightClickPage } from "../pages/rightClickPage";

export const test = base.extend<{ rightClickPage: RightClickPage }>({
  rightClickPage: async ({ page }, use) => {
    await use(new RightClickPage(page));
  },
});
