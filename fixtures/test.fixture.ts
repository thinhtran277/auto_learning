import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { CheckboxesPage } from "../pages/checkboxes.page";
import { DropdownPage } from "../pages/dropdown.page";
import { StatusCodePage } from "../pages/statuscode";

type PomFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  statuscodePage: StatusCodePage;
};

export const test = base.extend<PomFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  checkboxesPage: async ({ page }, use) => {
    await use(new CheckboxesPage(page));
  },
  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },  

  statuscodePage: async ({ page }, use) => {
    await use(new StatusCodePage(page));
  }
});

export { expect } from "@playwright/test";

console.log("test.fixture.ts loaded");
