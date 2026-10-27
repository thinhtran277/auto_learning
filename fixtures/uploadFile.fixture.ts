import { test as base } from "@playwright/test";
import { UploadFilePage } from "../pages/uploadFile.page";

export const test = base.extend<{ uploadFilePage: UploadFilePage }>({
  uploadFilePage: async ({ page }, use) => {
    await use(new UploadFilePage(page));
  },
});
