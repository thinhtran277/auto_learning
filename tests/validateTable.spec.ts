import { test, expect } from "../fixtures/test.fixture";

test.describe("validateTable", () => {
  test.beforeEach(async ({ validateTablePage }) => {
    test.slow();
    await validateTablePage.open();
  });

  test("TC08: Web Table - Validate largest due person from a table", async ({ validateTablePage }) => {
    const people = await validateTablePage.getPeople();

    // Step 1: find the person with the largest due
    let top = people[0];
    for (const person of people) {
      if (person.due > top.due) {
        top = person;
      }
    }

    // Step 2: only one person may have that due (no tie)
    let countTop = 0;
    for (const person of people) {
      if (person.due === top.due) {
        countTop++;
      }
    }
    expect(countTop).toBe(1);

    // Step 3: the row with that due on the page must show the same name
    const topRow = validateTablePage.rows.filter({ hasText: "$" + top.due.toFixed(2) });
    await expect(topRow).toContainText(top.firstName);
    await expect(topRow).toContainText(top.lastName);

  });
});