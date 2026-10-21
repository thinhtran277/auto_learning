import { test, expect } from "../fixtures/test.fixture";

test.describe("Dropdown", () => {
  test.beforeEach(async ({ dropdownPage }) => {
    test.slow();
    await dropdownPage.open();
  });

  test("TC04: Dropdown - Select single option", async ({ dropdownPage }) => {
    await dropdownPage.selectOption("Option 1");
    await expect(dropdownPage.dropdown).toHaveValue("1");
  });
});

