import { test, expect } from "../fixtures/test.fixture";

test.describe("Form Authentication", () => {
  test.beforeEach(async ({ loginPage }) => {
    test.slow();
    await loginPage.open();
  });

  test("TC01: Login successful with valid credentials", async ({ loginPage }) => {
    await loginPage.fillCredentials("tomsmith", "SuperSecretPassword!");
    await loginPage.clickLogin();
    await expect(loginPage.page).toHaveURL(/\/secure$/);
    await expect(loginPage.flashMessage).toContainText("You logged into a secure area!");
  });

  test("TC02: Login failed with invalid password", async ({ loginPage }) => {
    await loginPage.fillCredentials("tomsmith", "wrongPassword");
    await loginPage.clickLogin();
    await expect(loginPage.flashMessage).toContainText("Your password is invalid!");
  });

  test("TC02-01: Login failed with invalid username", async ({ loginPage }) => {
    await loginPage.fillCredentials("wrongUsername", "SuperSecretPassword!");
    await loginPage.clickLogin();
    await expect(loginPage.flashMessage).toContainText("Your username is invalid!");
  });
});