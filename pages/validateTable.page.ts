import { type Locator, type Page } from "@playwright/test";
export type Person = {
  firstName: string;
  lastName: string;
  due: number;
};
export class ValidateTablePage {
  readonly page: Page;
  readonly url = "https://the-internet.herokuapp.com/tables";
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    //get all rows that have cells, excluding the header row
    this.rows = page.getByRole("table").first().getByRole("row").filter({ has: page.getByRole("cell") });

  };

  async getPeople(): Promise<Person[]> {
    const people: Person[] = [];
    const count = await this.rows.count();

    for (let i = 0; i < count; i++) {
      const cells = this.rows.nth(i).getByRole("cell");
      // Column order on the page: Last Name, First Name, Email, Due, ...
      const lastName = await cells.nth(0).innerText();
      const firstName = await cells.nth(1).innerText();
      const dueText = await cells.nth(3).innerText();

      people.push({
        firstName,
        lastName,
        // "$50.00" -> 50, so dues compare as numbers, not strings
        due: Number(dueText.replace("$", "")),
      });
    }
    return people;
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }


}