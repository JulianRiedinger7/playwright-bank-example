import test, { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { HeaderPage } from '../pages/HeaderPage';
import { UserPage } from '../pages/UserPage';

test.describe('Login Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    homePage = new HomePage(page);
    await homePage.clickCustomerLoginBtn();
  });

  test('Customer should login and logout correctly with valid name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const name: string = 'Hermoine Granger';

    await loginPage.selectNameOption(name);
    await loginPage.clickLoginBtn();

    const headerPage = new HeaderPage(page);
    const userPage = new UserPage(page);

    expect(headerPage.isLogoutVisible()).toBeTruthy();
    expect(await userPage.getUserWelcomeText()).toContain(name);

    await headerPage.clickLogoutBtn();
    expect(await loginPage.isSelectVisible()).toBeTruthy();
  });
});
