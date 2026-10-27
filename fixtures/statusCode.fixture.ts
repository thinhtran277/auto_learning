import { test as base } from "@playwright/test";
import { StatusCodePage } from "../pages/statusCode.page";

export const test = base.extend<{ statuscodePage: StatusCodePage }>({
  statuscodePage: async ({ page }, use) => {
    await use(new StatusCodePage(page));
  },
});
