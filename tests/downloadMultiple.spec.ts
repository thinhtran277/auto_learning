import fs from "fs";
import { test, expect } from "../fixtures/test.fixture";

// Files on this page are uploaded by other users and change often, update this list if a file disappears
const fileNames = ["hello.txt", "sample.txt"];

test.describe("downloadMultiple", () => {
  test.beforeEach(async ({ downloadMultiplePage }) => {
    test.slow();
    await downloadMultiplePage.open();
  });

  test("TC13: Download multiple files", async ({ downloadMultiplePage }) => {
    for (const fileName of fileNames) {
      await test.step(`Download ${fileName}`, async () => {
        const downloadedName = await downloadMultiplePage.downloadFile(fileName);

        // The browser received the file we clicked, not some other file
        expect(downloadedName).toBe(fileName);

        // The file is saved on local disk
        expect(fs.existsSync("download/" + downloadedName)).toBe(true);
      });
    }
  });
});
