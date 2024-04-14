import { Locator, Page } from '@playwright/test';

export class HomePage {
  private readonly customerLoginBtn: Locator;
  private readonly managerLoginBtn: Locator;

  constructor(page: Page) {
    this.customerLoginBtn = page.getByRole('button', { name: 'Customer Login' });
    this.managerLoginBtn = page.getByRole('button', { name: 'Bank Manager Login' });
  }

  async clickCustomerLoginBtn() {
    await this.customerLoginBtn.click();
  }

  async clickManagerLoginBtn() {
    await this.managerLoginBtn.click();
  }
}
