import { test } from "../fixtures/test.fixture";

test.describe("statusCode", () => {
    test.beforeEach(async ({ statuscodePage }) => {
        test.slow();
        await statuscodePage.open();
    });

    test("TC06: Hyperlink - Status codes navigation", async ({ statuscodePage }) => {
        await statuscodePage.navigate200();
        await statuscodePage.expect200();
        await statuscodePage.backToStatusCodesList();
        await statuscodePage.navigate301();
        await statuscodePage.expect301();
        await statuscodePage.backToStatusCodesList();
        await statuscodePage.navigate404();
        await statuscodePage.expect404();
        await statuscodePage.backToStatusCodesList();
        await statuscodePage.navigate500();
        await statuscodePage.expect500();
        await statuscodePage.backToStatusCodesList();
    });
});