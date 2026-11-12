import { test, expect } from "../fixtures/test.fixture";

test.describe("detectBrokenImages", () => {
  // Step 1 + 2: open the browser and go to the broken images page
  test.beforeEach(async ({ detectBrokenImagesPage }) => {
    test.slow();
    await detectBrokenImagesPage.open();
  });

  test("TC14: Detect broken images", async ({ detectBrokenImagesPage }) => {
    // Step 3 + 4: get the src of every image, e.g. ["/img/...svg", "asdf.jpg", "hjkl.jpg", "img/avatar-blank.jpg"]
    const sources = await detectBrokenImagesPage.getImageSources();

    // Empty list to collect the broken images
    const brokenImages: string[] = [];

    for (const src of sources) {
      // Step 5: send a GET request to the image
      const statusCode = await detectBrokenImagesPage.getStatusCode(src);

      // Step 6: status code is not 200, so this image is broken, add it to the list
      if (statusCode !== 200) {
        brokenImages.push(src);
      }
    }

    // This page breaks these 2 images on purpose, any other result means the page changed
    expect(brokenImages).toEqual(["asdf.jpg", "hjkl.jpg"]);
  });
});
