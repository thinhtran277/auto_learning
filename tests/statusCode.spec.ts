import { test, expect } from "../fixtures/test.fixture";

test.describe("statusCode", () => {
    test.beforeEach(async ({ statuscodePage }) => {
        test.slow();
        await statuscodePage.open();
    });

    test("TC06: Hyperlink - Status codes navigation", async ({ statuscodePage, page }) => {
        await statuscodePage.navigate200();
        await expect(page).toHaveURL(`${statuscodePage.url}/200`);
        await expect(statuscodePage.message200).toBeVisible();
        await statuscodePage.backToStatusCodesList();

        await statuscodePage.navigate301();
        await expect(page).toHaveURL(`${statuscodePage.url}/301`);
        await expect(statuscodePage.message301).toBeVisible();
        await statuscodePage.backToStatusCodesList();

        await statuscodePage.navigate404();
        await expect(page).toHaveURL(`${statuscodePage.url}/404`);
        await expect(statuscodePage.message404).toBeVisible();
        await statuscodePage.backToStatusCodesList();

        await statuscodePage.navigate500();
        await expect(page).toHaveURL(`${statuscodePage.url}/500`);
        await expect(statuscodePage.message500).toBeVisible();
        await statuscodePage.backToStatusCodesList();
    });
});
