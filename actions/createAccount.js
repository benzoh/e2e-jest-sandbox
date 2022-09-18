const chalk = require( 'chalk' );

class createAccount {
    constructor(page) {
        this.url = "https://bookmarks.hippohack.me/";
        this.page = page;
        this.signupPageBtn = "body > div.eyecatch > div:nth-child(3) > div > div.d-flex > a:nth-child(2)";
        
        this.signupBody = "#new_account";
        this.emailField = "#account_email";
        this.passwordField = "#account_password";
        this.passwordConfirmationField = "#account_password_confirmation";
        this.signupBtn = "#new_account > div.actions > input";

        this.headingTitle = "Confirmation email has been sent";
    }

    async signup(email, password) {
        try {
            await this.page.goto(this.url);
            await this.page.waitForSelector(this.signupPageBtn);
            await this.page.click(this.signupPageBtn);
            
            // Wait for the signupBody on the signup page to load
            await this.page.waitForSelector(this.signupBody);

            // Type the login credentials into the input fields
            await this.page.type(this.emailField, email);
            await this.page.type(this.passwordField, password);
            await this.page.type(this.passwordConfirmationField, password);
            await this.page.waitForTimeout(1000);

            // Click then create account button
            await this.page.click(this.signupBtn);

            // Wait for headingTitle to load
            await this.page.waitForSelector("body > div.row.justify-content-center > div > h2");
            await this.page.waitForTimeout(1000);

            const headingTitle = await this.page.$eval(
                "body > div.row.justify-content-center > div > h2",
                (el) => el.textContent
            );
            console.log(chalk.blue({headingTitle}));

            return headingTitle;
        } catch (err) {
            console.log(chalk.red("ERROR => ", err));
        }
    }
}

module.exports = ( page ) => new createAccount( page );
