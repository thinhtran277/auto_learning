import { test as base } from "@playwright/test";
import { TodoMvcPage } from "../pages/todoMvc.page";
import { TodoMvcCompletePage } from "../pages/todoMvcComplete.page";
import { TodoMvcDeletePage } from "../pages/todoMvcDelete.page";
import { TodoMvcEditPage } from "../pages/todoMvcEdit.page";

// All TodoMVC pages share one fixture file since they belong to the same site
export const test = base.extend<{
  todoMvcPage: TodoMvcPage;
  todoMvcCompletePage: TodoMvcCompletePage;
  todoMvcDeletePage: TodoMvcDeletePage;
  todoMvcEditPage: TodoMvcEditPage;
}>({
  todoMvcPage: async ({ page }, use) => {
    await use(new TodoMvcPage(page));
  },
  todoMvcCompletePage: async ({ page }, use) => {
    await use(new TodoMvcCompletePage(page));
  },
  todoMvcDeletePage: async ({ page }, use) => {
    await use(new TodoMvcDeletePage(page));
  },
  todoMvcEditPage: async ({ page }, use) => {
    await use(new TodoMvcEditPage(page));
  },
});
