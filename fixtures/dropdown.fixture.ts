import { test as base } from "@playwright/test";
import { DropdownPage } from "../pages/dropdownPage";

export const test = base.extend<{ dropdownPage: DropdownPage }>({
  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },
});
