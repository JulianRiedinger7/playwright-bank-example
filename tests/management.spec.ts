import test, { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AddCustomerPage } from '../pages/management/AddCustomerPage';
import { CustomersPage } from '../pages/management/CustomersPage';
import { OpenAccountPage, currency } from '../pages/management/OpenAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { HeaderPage } from '../pages/HeaderPage';
import { UserPage } from '../pages/UserPage';

test.describe('Bank Management Tests', () => {
  let homePage: HomePage;
  const customerData = {
    firstName: 'Julian',
    lastName: 'Perez',
    postCode: '123',
  };

  test.beforeEach(async ({ page }) => {
    page.goto('');
    homePage = new HomePage(page);
    await homePage.clickManagerLoginBtn();
  });

  test('Manager should be able to add a customer and delete it correctly', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    await addCustomerPage.clickAddCustomerTab();

    await addCustomerPage.enterFirstName(customerData.firstName);
    await addCustomerPage.enterLastName(customerData.lastName);
    await addCustomerPage.enterPostCode(customerData.postCode);

    page.on('dialog', (dialog) => {
      expect(dialog.message()).toContain('Customer added successfully');
      dialog.accept();
    });
    await addCustomerPage.clickAddCustomerBtn();

    const customersPage = new CustomersPage(page);
    await customersPage.clickCustomersTab();

    await customersPage.enterSearch(customerData.firstName);
    const isFirstNameCorrect = await customersPage.iscustomerInfoCorrect('firstName', customerData.firstName);
    const isLastNameCorrect = await customersPage.iscustomerInfoCorrect('lastName', customerData.lastName);
    const isPostCodeCorrect = await customersPage.iscustomerInfoCorrect('postCode', customerData.postCode);

    expect(isFirstNameCorrect).toBeTruthy();
    expect(isLastNameCorrect).toBeTruthy();
    expect(isPostCodeCorrect).toBeTruthy();

    await customersPage.clickSearchResultDeleteBtn();
    const isCustomerInfoVisible = await customersPage.isSearchResultFirstNameVisible();

    expect(isCustomerInfoVisible).toBeFalsy();
  });

  test("Manager should be able to open a new customer's account", async ({ page }) => {
    interface customerInfo {
      name: string;
      currency: currency;
    }

    const harryInfo: customerInfo = {
      name: 'Harry Potter',
      currency: 'Rupee',
    };

    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.clickOpenAccountTab();

    await openAccountPage.selectCustomerName(harryInfo.name);
    await openAccountPage.selectCurrency(harryInfo.currency);

    let accountNumber: string = '';
    page.on('dialog', (dialog) => {
      expect(dialog.message()).toContain('Account created successfully');
      accountNumber = dialog.message().split(':')[1].trim();
      dialog.accept();
    });
    await openAccountPage.clickProcessBtn();

    const headerPage = new HeaderPage(page);
    await headerPage.clickHomeBtn();

    const homePage = new HomePage(page);
    await homePage.clickCustomerLoginBtn();

    const loginPage = new LoginPage(page);
    await loginPage.selectNameOption('Harry Potter');
    await loginPage.clickLoginBtn();

    const userPage = new UserPage(page);

    await userPage.selectAccount(accountNumber);

    const userAccountNumber = await userPage.getAccountNumberText();
    const userBalance = await userPage.getBalanceText();
    const userCurrency = await userPage.getCurrencyText();

    expect(userAccountNumber?.trim()).toEqual(accountNumber);
    expect(userBalance).toEqual('0');
    expect(userCurrency).toEqual(harryInfo.currency);
  });
});
