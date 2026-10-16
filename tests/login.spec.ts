import { test } from "../fixtures/test.fixture";

test.describe("Form Authentication", () => {
  test.beforeEach(async ({ loginPage }) => {
    test.slow();
    await loginPage.open();
  });

  test("TC01: Login successful with valid credentials", async ({ loginPage }) => {
    await loginPage.login("tomsmith", "SuperSecretPassword!");
    await loginPage.expectLoggedIn();
  });

  test("TC02: Login failed with invalid password", async ({ loginPage }) => {
    await loginPage.login("tomsmith", "wrongPassword");
    await loginPage.expectLoginFailed("Your password is invalid!");
  });

  test("TC03: Login failed with invalid username", async ({ loginPage }) => {
    await loginPage.login("wrongUsername", "SuperSecretPassword!");
    await loginPage.expectLoginFailed("Your username is invalid!");
  });
});