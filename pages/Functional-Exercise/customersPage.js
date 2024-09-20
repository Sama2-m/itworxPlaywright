

exports.CustomersPage = class Customers {
    constructor(page) {
        this.page = page;
        this.customerSearchTxt = page.getByPlaceholder('Search Customer');
        this.firstNameCell = page.locator('td.ng-binding:nth-of-type(1)');
        this.lastNameCell = page.locator('td.ng-binding:nth-of-type(2)');
        this.postCodeCell = page.locator('td.ng-binding:nth-of-type(3)');
        this.accountNumberCell = page.locator('td span.ng-binding');

    }
    async searchCustomer(name) {
        await this.customerSearchTxt.fill(name);
    }
    async getCustomerFirstName() {
        const firstName = await this.firstNameCell.textContent();
        return firstName.trim();
    }
    async getCustomerLastName() {
        const lastName = await this.lastNameCell.textContent();
        return lastName.trim();
    }
    async getPostCode() {
        const postCode = await this.postCodeCell.textContent();
        return postCode.trim();
    }
    async getAccountNumber() {
        const accountNumber = await this.accountNumberCell.textContent();
        return accountNumber.trim();
    }
}