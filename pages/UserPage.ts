import { Locator, Page } from '@playwright/test';

export class UserPage {
  private readonly userWelcome: Locator;
  private readonly accountSelect: Locator;
  private readonly accountNumber: Locator;
  private readonly balance: Locator;
  private readonly currency: Locator;

  constructor(page: Page) {
    this.userWelcome = page.locator('strong > span');
    this.accountSelect = page.locator('#accountSelect');
    this.accountNumber = page.locator('//div[@class = "center"][1]//strong[1]');
    this.balance = page.locator('//div[@class = "center"][1]//strong[2]');
    this.currency = page.locator('//div[@class = "center"][1]//strong[3]');
  }

  async getUserWelcomeText(): Promise<String | null> {
    return this.userWelcome.textContent();
  }

  async selectAccount(accountNumber: string) {
    await this.accountSelect.selectOption({ label: accountNumber });
  }

  async getAccountNumberText(): Promise<String | null> {
    return this.accountNumber.textContent();
  }

  async getBalanceText(): Promise<String | null> {
    return this.balance.textContent();
  }

  async getCurrencyText(): Promise<String | null> {
    return this.currency.textContent();
  }
}
