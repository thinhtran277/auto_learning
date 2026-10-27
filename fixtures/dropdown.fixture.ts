import { test as base } from "@playwright/test";
import { DropdownPage } from "../pages/dropdown.page";

export const test = base.extend<{ dropdownPage: DropdownPage }>({
  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },
});
