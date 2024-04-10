import { Locator, Page } from '@playwright/test';

export class HomePage {
  private readonly customerLoginBtn: Locator;

  constructor(page: Page) {
    this.customerLoginBtn = page.getByRole('button', { name: 'Customer Login' });
  }

  async clickCustomerLoginBtn() {
    await this.customerLoginBtn.click();
  }
}
