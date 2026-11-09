import { test, expect } from "../fixtures/test.fixture";

test.describe("rightClick", () => {
  test.beforeEach(async ({ rightClickPage }) => {
    test.slow();
    await rightClickPage.open();
  });

  test("TC11: Right click - Context menu", async ({ rightClickPage }) => {
    const message = await rightClickPage.rightClickAndGetAlert();
    expect(message).toBe("You selected a context menu");
  });
});