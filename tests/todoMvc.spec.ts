import { test, expect } from "../fixtures/test.fixture";

test.describe("todoMvc", () => {
  test.beforeEach(() => {
    test.slow();
  });

  test("TC15: TodoMVC - Add new todos", async ({ todoMvcPage }) => {
    await todoMvcPage.open();
    await todoMvcPage.addTodo("Buy milk");
    await todoMvcPage.addTodo("Buy groceries");

    await expect(todoMvcPage.todoItems).toHaveCount(2);
    // An array checks every label, in this exact order
    await expect(todoMvcPage.todoLabels).toHaveText(["Buy milk", "Buy groceries"]);
  });

  test("TC16: TodoMVC - Mark todo as completed", async ({ todoMvcCompletePage }) => {
    await todoMvcCompletePage.open();
    await todoMvcCompletePage.addTodo("Buy milk");
    await todoMvcCompletePage.toggleTodo("Buy milk");

    await expect(todoMvcCompletePage.todoToggle("Buy milk")).toBeChecked();
    // The app shows "0 items left!", so check that the text contains it
    await expect(todoMvcCompletePage.todoCount).toContainText("0 items left");
  });

  test("TC17: TodoMVC - Delete a todo", async ({ todoMvcDeletePage }) => {
    await todoMvcDeletePage.open();
    await todoMvcDeletePage.addTodo("Pay bills");
    await todoMvcDeletePage.deleteTodo("Pay bills");

    await expect(todoMvcDeletePage.todoItem("Pay bills")).toHaveCount(0);
  });

  test("TC18: TodoMVC - Edit/rename a todo", async ({ todoMvcEditPage }) => {
    await todoMvcEditPage.open();
    await todoMvcEditPage.addTodo("Walk the dog");
    await todoMvcEditPage.renameTodo("Walk the dog", "Walk the dog (30 min)");

    await expect(todoMvcEditPage.todoLabels).toHaveText(["Walk the dog (30 min)"]);
  });
});
