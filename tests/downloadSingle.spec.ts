import fs from "fs";
import { test, expect } from "../fixtures/test.fixture";

test.describe("downloadSingle", () => {
  test.beforeEach(async ({ downloadSinglePage }) => {
    test.slow();
    await downloadSinglePage.open();
  });

  test("TC12: Download a single file", async ({ downloadSinglePage }) => {
    const filePath = await downloadSinglePage.downloadFile();
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
