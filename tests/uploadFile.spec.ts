import { test, expect } from "../fixtures/test.fixture";

test.describe("uploadFile", () => {
  test.beforeEach(async ({ uploadFilePage }) => {
    test.slow();
    await uploadFilePage.open();
  });

  test("TC07: Upload a file", async ({ uploadFilePage }) => {
    await uploadFilePage.chooseFile();
    await uploadFilePage.upLoad();
    await expect(uploadFilePage.uploadedTitle).toBeVisible();
    await expect(uploadFilePage.uploadedFiles).toHaveText("file-sample_150kB.pdf");
  });
});