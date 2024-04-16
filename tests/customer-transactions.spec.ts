import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { UserPage } from '../pages/UserPage';

test.describe('Customer Transactions Suite', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let userPage: UserPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    homePage = new HomePage(page);
    await homePage.clickCustomerLoginBtn();

    loginPage = new LoginPage(page);
    await loginPage.selectNameOption('Harry Potter');
    await loginPage.clickLoginBtn();
  });

  test('Customer should not be able to withdraw more than the balance', async ({ page }) => {
    userPage = new UserPage(page);

    expect(await userPage.getBalanceText()).toEqual('0');

    await userPage.clickWithdrawlBtn();
    await userPage.enterAmount('10');
    await userPage.submitTransaction();

    expect(
      await userPage.isMessageCorrect('Transaction Failed. You can not withdraw amount more than the balance.')
    ).toBeTruthy();
  });

  test('Customer should be able to deposit correctly', async ({ page }) => {
    userPage = new UserPage(page);

    expect(await userPage.getBalanceText()).toEqual('0');
    const amountToDeposit = '100';

    await userPage.clickDepositBtn();
    await userPage.enterAmount(amountToDeposit);
    await userPage.submitTransaction();

    expect(await userPage.isMessageCorrect('Deposit Successful')).toBeTruthy();
    expect(await userPage.getBalanceText()).toEqual(amountToDeposit);
  });
});
