import { test } from "../fixtures/test.fixture";

test.describe("Multi Dropdown", () => {
    test.beforeEach(async ({ multidropdownPage }) => {
        // leave time to pass the Cloudflare check by hand
        test.setTimeout(180_000);
        await multidropdownPage.open();
    });

    test("TC05: Dropdown - Select multiple options", async ({ multidropdownPage }) => {
        await multidropdownPage.selectOptions(["Banana", "Apple"]);
        await multidropdownPage.expectSelectedOptions(["banana", "apple"]);
    });
});
