import { test, expect } from "../fixtures/test.fixture";

test.describe("todoMvc", () => {
  test.beforeEach(async ({ todoMvcPage }) => {
    test.slow();
    await todoMvcPage.open();
  });

  test("TC15: TodoMVC - Add new todos", async ({ todoMvcPage }) => {
    await todoMvcPage.addTodo("Buy laptop");
    await todoMvcPage.addTodo("Buy phone");

    await expect(todoMvcPage.todoItems).toHaveCount(2);
    // An array checks every label, in this exact order
    await expect(todoMvcPage.todoLabels).toHaveText(["Buy laptop", "Buy phone"]);
  });

  test("TC16: TodoMVC - Mark todo as completed", async ({ todoMvcPage }) => {
    await todoMvcPage.addTodo("Buy laptop");
    await todoMvcPage.toggleTodo("Buy laptop");

    await expect(todoMvcPage.todoToggle("Buy laptop")).toBeChecked();
    // The app shows "0 items left!", so check that the text contains it
    await expect(todoMvcPage.todoCount).toContainText("0 items left");
  });

  test("TC17: TodoMVC - Delete a todo", async ({ todoMvcPage }) => {
    await todoMvcPage.addTodo("Pay bills");
    await todoMvcPage.deleteTodo("Pay bills");

    await expect(todoMvcPage.todoItem("Pay bills")).toHaveCount(0);
  });

  test("TC18: TodoMVC - Edit/rename a todo", async ({ todoMvcPage }) => {
    await todoMvcPage.addTodo("Hello world");
    await todoMvcPage.renameTodo("Hello world", "Hello world (updated)");

    await expect(todoMvcPage.todoLabels).toHaveText(["Hello world (updated)"]);
  });
});
