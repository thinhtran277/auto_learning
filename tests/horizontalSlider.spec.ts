import { test, expect } from "../fixtures/test.fixture";

test.describe("horizontalSlider", () => {
  test.beforeEach(async ({ horizontalSliderPage }) => {
    test.slow();
    await horizontalSliderPage.open();
  });

  test("TC10: Horizontal Slider - Set value to 3.5", async ({ horizontalSliderPage }) => {
    await horizontalSliderPage.getValue();
    await horizontalSliderPage.setValue(3.5);
    await expect(await horizontalSliderPage.getValue()).toBe(3.5);
  });
});