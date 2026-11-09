import { type Locator, type Page } from "@playwright/test";
import { TodoMvcPage } from "./todoMvc.page";

export class TodoMvcEditPage extends TodoMvcPage {
  readonly editInput: Locator;
  readonly todoLabel: (text: string) => Locator;

  constructor(page: Page) {
    super(page);
    // Only shows up after double-clicking a todo
    this.editInput = page.getByRole("textbox", { name: "Edit todo" });
    this.todoLabel = (text) => this.todoItem(text).getByTestId("todo-item-label");
  }

  async renameTodo(oldText: string, newText: string) {
    await this.todoLabel(oldText).dblclick();
    // fill() clears the old text before typing the new one
    await this.editInput.fill(newText);
    await this.editInput.press("Enter");
  }
}
