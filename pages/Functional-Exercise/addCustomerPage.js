

exports.AddCustomerPage = class AddCustomer {
    constructor(page) {
        this.page = page;
        this.customerFirstNameTxt = page.getByPlaceholder('First Name');
        this.customerLastNameTxt = page.getByPlaceholder('Last Name');
        this.postCodeTxt = page.getByPlaceholder('Post Code');
        this.addCustomerBtn = page.locator('//button[@class="btn btn-default"]');
        this.customerSuccessMsgs = [];
    }
    async fillCustomerInfo(firstName, lastName, postCode) {
        await this.customerFirstNameTxt.fill(firstName);
        await this.customerLastNameTxt.fill(lastName);
        await this.postCodeTxt.fill(postCode);
    }
    async clickAddCustomer(messagesArray, expectedSuccessMsg) {
        const regex = /customer id :(\d+)/;
        let customerId;
        this.page.once('dialog', async dialog => {
            const confirmationMsg = dialog.message();
            messagesArray.push(confirmationMsg); // Push the dialog message to the array
            await dialog.dismiss().catch(() => { });
        });
        await this.addCustomerBtn.hover();
        await this.addCustomerBtn.click({ force: true });
        for (const message of messagesArray) {
            if (message.includes(expectedSuccessMsg)) {
                const match = message.match(regex);
                if (match) {
                    customerId = match[1];
                    console.log(`Customer ID extracted: ${customerId}`);
                }
            }
        }
        return customerId;
    }
}