import { test } from "../fixtures/test.fixture";

test.describe("Checkboxes", () => {
  test.beforeEach(async ({ checkboxesPage }) => {
    test.slow();
    await checkboxesPage.open();
  });

  test("TC03: Checkboxes - Check to a box", async ({ checkboxesPage }) => {
    await checkboxesPage.checkBox1();
    await checkboxesPage.expectBox1Checked();
    await checkboxesPage.checkBox2();
    await checkboxesPage.expectBox2Checked();
  });
});
