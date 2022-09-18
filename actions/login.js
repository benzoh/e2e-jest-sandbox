const chalk = require("chalk");

class login {
    constructor(page) {
        this.url = "https://bookmarks.hippohack.me/";
        this.page = page;
        this.loginPageBtn =
            "body > div.eyecatch > div:nth-child(3) > div > div.mt-2.text-white.text-center > a";

        this.emailInput = "#account_email";
        this.passwordInput = "#account_password";
        this.loginBtn = "#new_account > div.actions > input";

        this.main = ".main.bookmarks";
    }

    async do() {
        try {
            await this.page.goto(this.url);
            await this.page.waitForSelector(this.loginPageBtn);
            await this.page.click(this.loginPageBtn);

            // Wait for the signupBody on the signup page to load
            await this.page.waitForSelector(this.loginBtn);
            await this.page.type(this.emailInput, process.env.LOGIN_EMAIL);
            await this.page.type(
                this.passwordInput,
                process.env.LOGIN_PASSWORD
            );
            await this.page.click(this.loginBtn);

            // Wait for home display
            await this.page.waitForSelector(this.main);
            await this.page.waitForTimeout(2000);
            const username = await this.page.$eval(
                "#app > nav > ul > li > div > a:nth-child(1) > div > span",
                (el) => el.textContent
            );

            await this.page.waitForTimeout(2000);

            return username;
        } catch (err) {
            console.log(chalk.red("ERROR => ", err));
        }
    }
}

module.exports = (page) => new login(page);
