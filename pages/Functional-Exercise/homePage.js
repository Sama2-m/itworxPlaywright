exports.HomePage=class HomePage {
    constructor(page) {
        this.page = page;
        this.bankManageBtn = page.getByRole('button', { name: 'Bank Manager Login' });
        this.addCustomerBtn = page.getByRole('button', { name: 'Add Customer' });
        this.openAccountBtn = page.getByRole('button', { name: 'Open Account' });
        this.customersBtn = page.getByRole('button', { name: 'Customers' });

    }
    async goToLoginOptionsPage() {
        await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
    }
    async clickBankManagerBtn() {
        await this.bankManageBtn.click();
    }
    async clickAddCustomerBtn() {
        await this.addCustomerBtn.click();
    }
    async clickOpenAccountBtn() {
        await this.openAccountBtn.click();
    }
    async clickCustomersBtn() {
        await this.customersBtn.click();
    }
}