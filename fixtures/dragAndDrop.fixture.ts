import { test as base } from "@playwright/test";
import { DragAndDropPage } from "../pages/dragAndDrop.page";

export const test = base.extend<{ dragAndDropPage: DragAndDropPage }>({
  dragAndDropPage: async ({ page }, use) => {
    await use(new DragAndDropPage(page));
  },
});
