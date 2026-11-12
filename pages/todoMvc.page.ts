import { type Locator, type Page } from "@playwright/test";

export class TodoMvcPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoLabels: Locator;
  readonly todoItem: (text: string) => Locator;
  readonly url = "https://todomvc.com/examples/react/dist/";

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.getByTestId("todo-item");
    this.todoLabels = page.getByTestId("todo-item-label");
    // One todo, found by its exact text
    this.todoItem = (text) => this.todoItems.filter({ has: page.getByText(text, { exact: true }) });
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press("Enter");
  }
}
