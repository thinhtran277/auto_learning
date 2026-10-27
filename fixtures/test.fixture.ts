import { mergeTests } from "@playwright/test";
import { test as loginTest } from "./login.fixture";
import { test as checkboxesTest } from "./checkboxes.fixture";
import { test as dropdownTest } from "./dropdown.fixture";
import { test as statusCodeTest } from "./statusCode.fixture";
import { test as multiDropdownTest } from "./multiDropdown.fixture";
import { test as uploadFileTest } from "./uploadFile.fixture";
import { test as validateTableTest } from "./validateTable.fixture";

// Each page has its own fixture file; this merges them so specs keep one import
export const test = mergeTests(
  loginTest,
  checkboxesTest,
  dropdownTest,
  statusCodeTest,
  multiDropdownTest,
  uploadFileTest,
  validateTableTest,
);

export { expect } from "@playwright/test";
