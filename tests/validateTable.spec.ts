import { test, expect } from "../fixtures/test.fixture";

test.describe("validateTable", () => {
  test.beforeEach(async ({ validateTablePage }) => {
    test.slow();
    await validateTablePage.open();
  });

  test("TC08: Web Table - Validate largest due person from a table", async ({ validateTablePage }) => {
    const people = await validateTablePage.getPeople();

    // Keep whoever has the larger due
    const top = people.reduce((max, p) => (p.due > max.due ? p : max));
    const fullName = `${top.firstName} ${top.lastName}`;

    expect(fullName).toBe("Jason Doe");

    // The row showing the top due on the page must belong to the same person
    const topRow = validateTablePage.rows.filter({ hasText: `$${top.due.toFixed(2)}` });
    await expect(topRow).toContainText(top.firstName);
    await expect(topRow).toContainText(top.lastName);

  });
});