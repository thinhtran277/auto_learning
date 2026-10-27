import { test as base } from "@playwright/test";
import { ValidateTablePage } from "../pages/validateTable.page";

export const test = base.extend<{ validateTablePage: ValidateTablePage }>({
  validateTablePage: async ({ page }, use) => {
    await use(new ValidateTablePage(page));
  },
});
