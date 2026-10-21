import { test, expect } from "../fixtures/test.fixture";

test.describe("Checkboxes", () => {
  test.beforeEach(async ({ checkboxesPage }) => {
    test.slow();
    await checkboxesPage.open();
  });

  test("TC03: Checkboxes - Check to a box", async ({ checkboxesPage }) => {
    await checkboxesPage.checkBox1();
    await expect(checkboxesPage.checkbox1).toBeChecked();
    await checkboxesPage.checkBox2();
    await expect(checkboxesPage.checkbox2).toBeChecked();
  });
});
