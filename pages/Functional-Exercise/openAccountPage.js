

exports.OpenAccountPage = class OpenAccount {
    constructor(page) {
        this.page = page;
        this.customerDropDown = page.locator('#userSelect');
        this.currencyDropDown = page.locator('#currency');
        this.processBtn = page.getByRole('button', { name: 'Process' });

    }
    async selectCustomer(customerName) {
        await this.customerDropDown.selectOption(customerName);
        
    }
    async selectCurrency(currency) {
        await this.currencyDropDown.selectOption(currency);
        
    }
    
    async clickProcessBtn(messagesArray, expectedSuccessMsg) {
        const regex = /account Number :(\d+)/;
        let accountNumber;
        this.page.once('dialog', async dialog => {
            const confirmationMsg = dialog.message();
            messagesArray.push(confirmationMsg); // Push the dialog message to the array
            await dialog.dismiss().catch(() => { });
        });
        await this.processBtn.click();
        for (const message of messagesArray) {
            if (message.includes(expectedSuccessMsg)) {
                const match = message.match(regex);
                if (match) {
                    accountNumber = match[1];
                    console.log(`Account number extracted: ${accountNumber}`);
                }
            }
        }
        return accountNumber;
    }
}