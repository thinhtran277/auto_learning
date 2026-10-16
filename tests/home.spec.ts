import { expect, test } from "../fixtures/test.fixture";

test("người dùng mở trang Getting Started từ trang chủ", async ({ homePage, page }) => {
  await homePage.open();
  await homePage.expectLoaded();
  await homePage.openGettingStarted();

  await expect(page).toHaveURL(/\/docs\/intro/);
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
});
