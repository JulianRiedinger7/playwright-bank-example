import { Locator, Page } from '@playwright/test';

export type currency = 'Dollar' | 'Pound' | 'Rupee';

export class OpenAccountPage {
  private readonly openAccountTab: Locator;
  private readonly customerNameSelect: Locator;
  private readonly currencySelect: Locator;
  private readonly processBtn: Locator;

  constructor(page: Page) {
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
    this.customerNameSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processBtn = page.getByRole('button', { name: 'Process' });
  }

  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }

  async selectCustomerName(customerName: string) {
    await this.customerNameSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currency: currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async clickProcessBtn() {
    await this.processBtn.click();
  }
}
