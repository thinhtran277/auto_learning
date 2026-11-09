import { type Locator, type Page } from "@playwright/test";
import { TodoMvcPage } from "./todoMvc.page";

export class TodoMvcDeletePage extends TodoMvcPage {
  readonly todoDeleteButton: (text: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.todoDeleteButton = (text) => this.todoItem(text).getByRole("button", { name: "Delete todo" });
  }

  async deleteTodo(text: string) {
    // The delete button is hidden until the mouse is over the todo
    await this.todoItem(text).hover();
    await this.todoDeleteButton(text).click();
  }
}
