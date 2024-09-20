exports.BankManagePage = class BankManager {
    constructor(page) {
        this.page = page;
        this.addCustomerBtn = page.getByRole('button', { name: 'Add Customer' });
    }

    async clickAddCustomerBtn() {
        await this.addCustomerBtn.click();
    }
}