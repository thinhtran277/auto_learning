import { test as base } from "@playwright/test";
import { TodoMvcPage } from "../pages/todoMvcPage";

export const test = base.extend<{ todoMvcPage: TodoMvcPage }>({
  todoMvcPage: async ({ page }, use) => {
    await use(new TodoMvcPage(page));
  },
});
