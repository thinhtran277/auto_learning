import { test, expect } from "../fixtures/test.fixture";

test.describe("dragAndDrop", () => {
  test.beforeEach(async ({ dragAndDropPage }) => {
    test.slow();
    await dragAndDropPage.open();
  });

  test("TC09: Drag & Drop columns", async ({ dragAndDropPage }) => {
    await dragAndDropPage.dragAndDrop();
    await expect(dragAndDropPage.columnA).toHaveText("B");
  });
});