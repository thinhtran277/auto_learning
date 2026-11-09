import { mergeTests } from "@playwright/test";
import { test as loginTest } from "./login.fixture";
import { test as checkboxesTest } from "./checkboxes.fixture";
import { test as dropdownTest } from "./dropdown.fixture";
import { test as statusCodeTest } from "./statusCode.fixture";
import { test as multiDropdownTest } from "./multiDropdown.fixture";
import { test as uploadFileTest } from "./uploadFile.fixture";
import { test as validateTableTest } from "./validateTable.fixture";
import { test as dragAndDropTest } from "./dragAndDrop.fixture";
import { test as horizontalSliderTest } from "./horizontalSlider.fixture";
import { test as rightClickTest } from "./rightClick.fixture";
import { test as downloadSingleTest } from "./downloadSingle.fixture";
import { test as downloadMultipleTest } from "./downloadMultiple.fixture";
import { test as detectBrokenImagesTest } from "./detectBrokenImages.fixture";
import { test as todoMvcTest } from "./todoMvc.fixture";

// Each page has its own fixture file; this merges them so specs keep one import
export const test = mergeTests(
  loginTest,
  checkboxesTest,
  dropdownTest,
  statusCodeTest,
  multiDropdownTest,
  uploadFileTest,
  validateTableTest,
  dragAndDropTest,
  horizontalSliderTest,
  rightClickTest,
  downloadSingleTest,
  downloadMultipleTest,
  detectBrokenImagesTest,
  todoMvcTest,
);

export { expect } from "@playwright/test";
