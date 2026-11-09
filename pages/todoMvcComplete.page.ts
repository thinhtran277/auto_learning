import { type Locator, type Page } from "@playwright/test";
import { TodoMvcPage } from "./todoMvc.page";

export class TodoMvcCompletePage extends TodoMvcPage {
  readonly todoCount: Locator;
  readonly todoToggle: (text: string) => Locator;

  constructor(page: Page) {
    // Run the base constructor first, so this.todoItem is ready to use
    super(page);
    this.todoCount = page.locator(".todo-count");
    this.todoToggle = (text) => this.todoItem(text).getByTestId("todo-item-toggle");
  }

  async toggleTodo(text: string) {
    await this.todoToggle(text).click();
  }
}
