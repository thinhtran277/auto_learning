import { test, expect } from "../fixtures/test.fixture";

test.describe("todoMvc", () => {
  // Step 1 + 2 of every test: open the browser and go to TodoMVC
  test.beforeEach(async ({ todoMvcPage }) => {
    test.slow();
    await todoMvcPage.open();
  });

  test("TC15: TodoMVC - Add new todos", async ({ todoMvcPage }) => {
    // Step 3: type the first todo and press Enter
    await todoMvcPage.addTodo("Buy laptop");

    // Step 4: type the second todo and press Enter
    await todoMvcPage.addTodo("Buy phone");

    // Step 5: verify the list has exactly 2 items
    await expect(todoMvcPage.todoItems).toHaveCount(2);

    // Step 6: verify the item texts, in this exact order
    await expect(todoMvcPage.todoLabels).toHaveText(["Buy laptop", "Buy phone"]);
  });

  test("TC16: TodoMVC - Mark todo as completed", async ({ todoMvcPage }) => {
    // Step 3: add a todo
    await todoMvcPage.addTodo("Buy laptop");

    // Step 4: click the toggle checkbox of that todo
    await todoMvcPage.toggleTodo("Buy laptop");

    // Step 5: verify the toggle is checked
    await expect(todoMvcPage.todoToggle("Buy laptop")).toBeChecked();

    // Step 6: verify footer shows "0 items left" (the app adds a "!", so use toContainText)
    await expect(todoMvcPage.todoCount).toContainText("0 items left");
  });

  test("TC17: TodoMVC - Delete a todo", async ({ todoMvcPage }) => {
    // Step 3: add a todo named "Pay bills"
    await todoMvcPage.addTodo("Pay bills");

    // Step 4 + 5: hover on "Pay bills", then click the "×" delete button (both inside deleteTodo)
    await todoMvcPage.deleteTodo("Pay bills");

    // Step 6: verify "Pay bills" is no longer in the list
    await expect(todoMvcPage.todoItem("Pay bills")).toHaveCount(0);
  });

  test("TC18: TodoMVC - Edit/rename a todo", async ({ todoMvcPage }) => {
    // Step 3: add a todo
    await todoMvcPage.addTodo("Hello world");

    // Step 4 + 5 + 6: double-click the label, clear and type the new text, press Enter (all inside renameTodo)
    await todoMvcPage.renameTodo("Hello world", "Hello world (updated)");

    // Step 7: verify the label now shows the new text
    await expect(todoMvcPage.todoLabels).toHaveText(["Hello world (updated)"]);
  });

  test("TC19: TodoMVC - Clear completed todos", async ({ todoMvcPage }) => {
    // Step 3: add 3 todos
    await todoMvcPage.addTodo("Task A");
    await todoMvcPage.addTodo("Task B");
    await todoMvcPage.addTodo("Task C");

    // Step 4: mark "Task B" as completed
    await todoMvcPage.toggleTodo("Task B");

    // Step 5: mark "Task C" as completed
    await todoMvcPage.toggleTodo("Task C");

    // Step 6: click "Clear completed"
    await todoMvcPage.clearCompleted();

    // Step 7: verify only "Task A" remains in the list
    await expect(todoMvcPage.todoLabels).toHaveText(["Task A"]);

    // Step 8: verify footer shows "1 item left"
    await expect(todoMvcPage.todoCount).toContainText("1 item left");
  });

  test("TC20: TodoMVC - Filter All/Active/Completed", async ({ todoMvcPage }) => {
    // Step 3: add 2 todos
    await todoMvcPage.addTodo("Alpha");
    await todoMvcPage.addTodo("Beta");

    // Step 4: mark "Beta" as completed
    await todoMvcPage.toggleTodo("Beta");

    // Step 5: Active filter shows only "Alpha"
    await todoMvcPage.filterActive();
    await expect(todoMvcPage.todoLabels).toHaveText(["Alpha"]);

    // Step 6: Completed filter shows only "Beta"
    await todoMvcPage.filterCompleted();
    await expect(todoMvcPage.todoLabels).toHaveText(["Beta"]);

    // Step 7: All filter shows both
    await todoMvcPage.filterAll();
    await expect(todoMvcPage.todoLabels).toHaveText(["Alpha", "Beta"]);
  });

  test("TC21: TodoMVC - Persistence across page refresh", async ({ todoMvcPage }) => {
    // Known app bug: this TodoMVC build does not save todos, they are lost after reload.
    // Remove test.fail() once the app keeps todos after a reload.
    test.fail();

    // Step 3: Add todo named "Call mom"
    await todoMvcPage.addTodo("Call mom");
    // Step 4: Verify "Call mom" is present in the list
    await expect(todoMvcPage.todoLabels).toHaveText(["Call mom"]);
    // Step 5: Reload the page
    await todoMvcPage.loadingPage();
    // Step 6: Verify "Call mom" is still present in the list
    await expect(todoMvcPage.todoLabels).toHaveText(["Call mom"]);
  });

  test("TC22: TodoMVC - Toggle all", async ({ todoMvcPage }) => {
    // Step 3: Add 2 todos: "Task One", "Task Two"
    await todoMvcPage.addTodo("Task One");
    await todoMvcPage.addTodo("Task Two");

    // Step 4: Check the "toggle all" checkbox (first <input type="checkbox"> inside <main>)
    await todoMvcPage.allToggle.click();

    // Step 5: Verify footer shows "0 items left"
    await expect(todoMvcPage.todoCount).toContainText("0 items left");

    // Step 6: Uncheck the "toggle all" checkbox
    await todoMvcPage.allToggle.click();

    // Step 7: Verify footer shows "2 items left"
    await expect(todoMvcPage.todoCount).toContainText("2 items left");
  });

});
