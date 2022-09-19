const chalk = require("chalk");

class logout {
    constructor(page) {
        this.url = "https://bookmarks.hippohack.me/";
        this.page = page;
        this.logoutBtn = "#app > nav > ul > li > div > a:nth-child(11)";

        this.signupPageBtn =
            "body > div.eyecatch > div:nth-child(3) > div > div.d-flex > a:nth-child(2)";
        this.tryDemoBtn =
            "body > div.eyecatch > div:nth-child(3) > div > div.d-flex > a:nth-child(1)";
    }

    async do() {
        try {
            await this.page.goto(this.url);
            await this.page.waitForSelector(this.logoutBtn);

            // menu open
            await this.page.click("#navbarDropdownMenuLink");
            await this.page.waitForTimeout(1000);

            await this.page.click(this.logoutBtn);

            // Wait for welcome display
            await this.page.waitForSelector(this.signupPageBtn);
            await this.page.waitForTimeout(2000);

            const tryDemoText = await this.page.$eval(
                this.tryDemoBtn,
                (el) => el.textContent
            );

            return tryDemoText;
        } catch (err) {
            console.log(chalk.red("ERROR => ", err));
        }
    }
}

module.exports = (page) => new logout(page);
