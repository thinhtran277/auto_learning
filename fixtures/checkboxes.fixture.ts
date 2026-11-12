import { test as base } from "@playwright/test";
import { CheckboxesPage } from "../pages/checkboxesPage";

export const test = base.extend<{ checkboxesPage: CheckboxesPage }>({
  checkboxesPage: async ({ page }, use) => {
    await use(new CheckboxesPage(page));
  },
});
