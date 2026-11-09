import { test, expect } from "../fixtures/test.fixture";

test.describe("detectBrokenImages", () => {
  test.beforeEach(async ({ detectBrokenImagesPage }) => {
    test.slow();
    await detectBrokenImagesPage.open();
  });

  test("TC14: Detect broken images", async ({ detectBrokenImagesPage }) => {
    const sources = await detectBrokenImagesPage.getImageSources();
    const brokenImages: string[] = [];

    for (const src of sources) {
      const statusCode = await detectBrokenImagesPage.getStatusCode(src);

      // Any image that does not return 200 is broken
      if (statusCode !== 200) {
        brokenImages.push(src);
      }
    }

    // This page breaks these 2 images on purpose, any other result means the page changed
    expect(brokenImages).toEqual(["asdf.jpg", "hjkl.jpg"]);
  });
});
