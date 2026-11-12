import { test as base } from "@playwright/test";
import { TodoMvcPage } from "../pages/todoMvc.page";

export const test = base.extend<{ todoMvcPage: TodoMvcPage }>({
  todoMvcPage: async ({ page }, use) => {
    await use(new TodoMvcPage(page));
  },
});
