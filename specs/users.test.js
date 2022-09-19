const chalk = require("chalk");

let credentials = require("../utils/credentials");
let createAccount = require("../actions/createAccount.js");
let login = require("../actions/login");
let logout = require("../actions/logout");

jest.setTimeout(60000);

describe("Basic authentication e2e tests", () => {
    const credential = credentials("User");

    beforeAll(async () => {
        // Set a definite size for the page viewport so view is consistent across browsers
        await page.setViewport({
            width: 1366,
            height: 768,
            deviceScaleFactor: 1,
        });

        createAccount = createAccount(page);
        login = login(page);
        logout = logout(page);
    });

    it("アカウント発行が可能（確認メール送信まで）", async () => {
        const headingTitle = await createAccount.signup(
            credential.email,
            credential.password
        );

        page.waitForTimeout(1000);
        expect(createAccount.headingTitle).toContain(headingTitle);
    });

    it("ログインが可能", async () => {
        const username = await login.do();

        page.waitForTimeout(1000);
        expect(username).toContain(process.env.LOGIN_USERNAME);
    });

    it("ログアウトが可能", async () => {
        const tryDemoText = await logout.do();

        page.waitForTimeout(1000);
        expect(tryDemoText).toContain("Try Demo");
    });
});
