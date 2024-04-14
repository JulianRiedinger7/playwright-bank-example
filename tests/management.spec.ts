import test, { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AddCustomerPage } from '../pages/management/AddCustomerPage';
import { CustomersPage } from '../pages/management/CustomersPage';

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

  test('Manager should add a customer and delete it correctly', async ({ page }) => {
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
});
