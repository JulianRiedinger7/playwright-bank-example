import test, { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { HeaderPage } from '../pages/HeaderPage';
import { UserPage } from '../pages/UserPage';

test.describe('Login Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    homePage = new HomePage(page);
    await homePage.clickCustomerLoginBtn();
  });

  test('User should login correctly with valid name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const name: string = 'Hermoine Granger';

    await loginPage.selectNameOption(name);
    await loginPage.clickLoginBtn();

    const headerPage = new HeaderPage(page);
    const userPage = new UserPage(page);

    await expect(await headerPage.getLogoutBtn()).toBeVisible();

    const userWelcomeText = await userPage.getUserWelcome().textContent();
    expect(userWelcomeText).toContain(name);
  });
});
