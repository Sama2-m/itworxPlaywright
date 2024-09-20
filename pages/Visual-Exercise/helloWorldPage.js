const path = require('path');
const fs = require('fs');

exports.HelloWorldPage = class HelloWorld {
    constructor(page) {
        this.page = page;
        this.diff2Btn = page.locator('a[href="?diff2"]');
        this.elementBtnSection = page.locator('.demo-page.center');
        this.clickMeBtn = page.getByRole('button', { name: 'Click me!' });
    }
    async goToHelloWorldPage() {
        await this.page.goto('https://applitools.com/helloworld/')
    }
    async clickDiff2Btn() {
        await this.diff2Btn.click();
    }
    async takeBaseScreenShot() {
        const screenshotFolder = path.join(__dirname, 'Screenshot-VE');
        // Check if Screenshot-VE folder exists, if not, create it
        if (!fs.existsSync(screenshotFolder)) {
            fs.mkdirSync(screenshotFolder);
        }
        // Path to the baseline image
        const baselineImage = path.join(screenshotFolder, 'baseline.png');
        if (!fs.existsSync(baselineImage)) {
            await this.page.screenshot({ path: baselineImage });
            console.log("Baseline screenshot taken.");
        }
        return baselineImage;
    }


    async takeCurrentScreenShot() {
        const currentImage = path.join(__dirname,'Screenshot-VE', 'current.png');
        // Check if the old screenshot exists and delete it
        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage); // Delete the old screenshot
        }
        await this.page.screenshot({ path: currentImage });
        return currentImage;
    }

    async getCurrentURL() {
        const currentURL = this.page.url();
        return currentURL
    }
    async takeScreenShotForElementBtnSection(ScreenshotName) {
        const screenshotPath = path.join(__dirname,'Screenshot-VE', `${ScreenshotName}.png`);
        if (fs.existsSync(screenshotPath)) {
            fs.unlinkSync(screenshotPath); // Delete the old screenshot
        }
        // Take a screenshot of the element
        await this.elementBtnSection.screenshot({ path: screenshotPath });
        return screenshotPath;
    }

    async clickOnClickMeBtn() {
        await this.clickMeBtn.click();

    }
}