import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly nameSelect: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    this.nameSelect = page.locator('#userSelect');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async selectNameOption(name: string) {
    await this.nameSelect.selectOption(name);
  }

  async clickLoginBtn() {
    await this.loginBtn.click();
  }
}
