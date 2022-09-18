const chalk = require("chalk");

class createAccount {
    constructor(page) {
        this.url = "https://bookmarks.hippohack.me/";
        this.page = page;
        this.signupBtn = "body > div.eyecatch > div:nth-child(3) > div > div.d-flex > a:nth-child(2)";
        this.signupBody = "#new_account";
        this.emailField = "#account_email";
        this.passwordField = "#account_password";
        this.passwordConfirmationField = "#account_password_confirmation";
        this.signupBtn = "#new_account > div.actions > input";
    }

    async signup(fullname, username, password) {
        try {
            await this.page.goto(this.url);
            await this.page.waitFor(this.signupBtn);
            await this.page.click(this.signupBtn);
            
            // Wait for the signupBody on the signup page to load
            await this.page.waitFor(this.signupBody);

            // Type the login credentials into the input fields
            await this.page.type(this.emailField, username);
            await this.page.waitFor(1000);
            await this.page.type(this.passwordField, password);
            await this.page.waitFor(1000);

            // Click then create account button
            await this.page.click(this.signupPageBtn);

            // Wait for homepage to load
            await this.page.waitFor("#firstname");
            await this.page.waitFor(2000);

            const firstname = await this.page.$eval(
                "#homeBody #firstname",
                (el) => el.textContent
            );

            return firstname;
        } catch (err) {
            console.log(chalk.red("ERROR => ", err));
        }
    }
}

module.exports = (page) => new createAccount(page);
