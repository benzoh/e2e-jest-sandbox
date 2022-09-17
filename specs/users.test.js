let credentials = require("../utils/credentials");
let createAccount = require("../actions/createAccount");

jest.setTimeout(60000);

describe("Basic authentication e2e tests", () => {
    let credential;

    beforeAll(async () => {
        // Set a definite size for the page viewport so view is consistent across browsers
        await page.setViewport({
            width: 1366,
            height: 768,
            deviceScaleFactor: 1,
        });

        credential = credentials("User");
        createAccount = await createAccount(page);
    });

    it("Should be able to create an account", async () => {
        const firstname = await createAccount.signup(
            credential.fullname,
            credential.username,
            credential.password
        );
        page.waitFor(1000);
        expect(credential.fullname).toContain(firstname);
    });
});
