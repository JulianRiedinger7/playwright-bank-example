import { Locator, Page } from '@playwright/test';

export class UserPage {
  private readonly userWelcome: Locator;
  private readonly accountSelect: Locator;
  private readonly accountNumber: Locator;
  private readonly balance: Locator;
  private readonly currency: Locator;
  private readonly withdrawlBtn: Locator;
  private readonly depositBtn: Locator;
  private readonly amountInput: Locator;
  private readonly submitTransactionBtn: Locator;
  private readonly transactionMessage: Locator;

  constructor(page: Page) {
    this.userWelcome = page.locator('strong > span');
    this.accountSelect = page.locator('#accountSelect');
    this.accountNumber = page.locator('//div[@class = "center"][1]//strong[1]');
    this.balance = page.locator('//div[@class = "center"][1]//strong[2]');
    this.currency = page.locator('//div[@class = "center"][1]//strong[3]');
    this.withdrawlBtn = page.getByRole('button', { name: 'Withdrawl' });
    this.depositBtn = page.getByRole('button', { name: 'Deposit' });
    this.amountInput = page.locator('form[name="myForm"] input');
    this.submitTransactionBtn = page.locator('form[name="myForm"] > button');
    this.transactionMessage = page.locator('span.error');
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

  async clickWithdrawlBtn() {
    await this.withdrawlBtn.click();
  }

  async clickDepositBtn() {
    await this.depositBtn.click();
  }

  async enterAmount(amount: string) {
    await this.amountInput.fill(amount);
  }

  async submitTransaction() {
    await this.submitTransactionBtn.click();
  }

  async isMessageCorrect(message: string): Promise<Boolean> {
    const transactionMessageText = await this.transactionMessage.textContent();
    return transactionMessageText?.includes(message) ? true : false;
  }
}
