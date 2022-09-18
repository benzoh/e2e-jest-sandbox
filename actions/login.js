const chalk = require( 'chalk' );

class login {
    constructor(page) {
        this.url = "https://bookmarks.hippohack.me/";
        this.page = page;
        this.loginPageBtn =
            "body > div.eyecatch > div:nth-child(3) > div > div.mt-2.text-white.text-center > a";
    }

    async do() {
        try {
            await this.page.goto(this.url);
            await this.page.waitForSelector(this.loginPageBtn);
            await this.page.click(this.loginPageBtn);
            // Wait for the signupBody on the signup page to load

            await this.page.waitForTimeout(2000);

            // const firstname = await this.page.$eval(
            //     "#homeBody #firstname",
            //     (el) => el.textContent
            // );

            return "hoge";
        } catch (err) {
            console.log(chalk.red("ERROR => ", err));
        }
    }
}

module.exports = ( page ) => new login( page );
