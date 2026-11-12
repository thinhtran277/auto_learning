import { type Locator, type Page } from "@playwright/test";

export class TodoMvcPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoLabels: Locator;
  readonly todoCount: Locator;
  readonly editInput: Locator;
  readonly todoItem: (text: string) => Locator;
  readonly todoToggle: (text: string) => Locator;
  readonly todoDeleteButton: (text: string) => Locator;
  readonly todoLabel: (text: string) => Locator;
  readonly url = "https://todomvc.com/examples/react/dist/";

  constructor(page: Page) {
    this.page = page;

    // Locators for the whole page
    this.newTodoInput = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.getByTestId("todo-item");
    this.todoLabels = page.getByTestId("todo-item-label");
    this.todoCount = page.locator(".todo-count");
    // Only shows up after double-clicking a todo
    this.editInput = page.getByRole("textbox", { name: "Edit todo" });

    // Locators for one todo, found by its exact text
    this.todoItem = (text) => this.todoItems.filter({ has: page.getByText(text, { exact: true }) });
    this.todoToggle = (text) => this.todoItem(text).getByTestId("todo-item-toggle");
    this.todoDeleteButton = (text) => this.todoItem(text).getByRole("button", { name: "Delete todo" });
    this.todoLabel = (text) => this.todoItem(text).getByTestId("todo-item-label");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press("Enter");
  }

  async toggleTodo(text: string) {
    await this.todoToggle(text).click();
  }

  async deleteTodo(text: string) {
    // The delete button is hidden until the mouse is over the todo
    await this.todoItem(text).hover();
    await this.todoDeleteButton(text).click();
  }

  async renameTodo(oldText: string, newText: string) {
    await this.todoLabel(oldText).dblclick();
    // fill() clears the old text before typing the new one
    await this.editInput.fill(newText);
    await this.editInput.press("Enter");
  }
}
