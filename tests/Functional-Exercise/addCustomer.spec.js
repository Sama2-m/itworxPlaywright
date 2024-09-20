import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/Functional-Exercise/homePage';
import { BankManagePage } from '../../pages/Functional-Exercise/bankManagerPage';
import { AddCustomerPage } from '../../pages/Functional-Exercise/addCustomerPage';
import { OpenAccountPage } from '../../pages/Functional-Exercise/openAccountPage';
import { CustomersPage } from '../../pages/Functional-Exercise/customersPage';
const testData = require('../../TestData/TestData.json');
let addCustomerConfirmationMsgs = [];
let openAccountConfirmationMsgs = [];
const addCustomerExpectedMessage = "Customer added successfully with customer id :"
const openAccountExpectedMessage = "Account created successfully with account Number :"


test('Add new customer', async ({ page }) => {
  const home = new HomePage(page);
  const bankManager = new BankManagePage(page);
  const addCustomer = new AddCustomerPage(page)
  const openAccount = new OpenAccountPage(page)
  const customers = new CustomersPage(page)
  await home.goToLoginOptionsPage();
  await home.clickBankManagerBtn();
  await bankManager.clickAddCustomerBtn();
  await addCustomer.fillCustomerInfo(testData.AddCustomer.firstName, testData.AddCustomer.lastName, testData.AddCustomer.postCode);
  const customerId = await addCustomer.clickAddCustomer(addCustomerConfirmationMsgs, addCustomerExpectedMessage);
  const messageExists = addCustomerConfirmationMsgs.some(message => message.includes(addCustomerExpectedMessage));
  expect(messageExists).toBe(true);
  test.info().annotations.push({ type: 'Customer ID', description: customerId });
  await home.clickOpenAccountBtn();
  await openAccount.selectCustomer(testData.SelectCustomer.customerName);
  await openAccount.selectCurrency(testData.SelectCustomer.currency);
  const accountNumber = await openAccount.clickProcessBtn(openAccountConfirmationMsgs, openAccountExpectedMessage);
  const messageOfAddAccountExists = openAccountConfirmationMsgs.some(message => message.includes(openAccountExpectedMessage));
  expect(messageOfAddAccountExists).toBe(true);
  test.info().annotations.push({ type: 'Account Number', description: accountNumber });
  await home.clickCustomersBtn();
  await customers.searchCustomer(testData.SearchCustomer.name);
  const customerFirstName= await customers.getCustomerFirstName();
  const customerLastName= await customers.getCustomerLastName();
  const customerPostCode= await customers.getPostCode();
  const customerAccountNumber= await customers.getAccountNumber();
  expect(customerFirstName).toEqual(testData.AddCustomer.firstName);
  expect(customerLastName).toEqual(testData.AddCustomer.lastName);
  expect(customerPostCode).toEqual(testData.AddCustomer.postCode);
  expect(customerAccountNumber).toEqual(accountNumber);
});