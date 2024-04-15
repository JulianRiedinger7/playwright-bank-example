import { Locator, Page } from '@playwright/test';

export class HeaderPage {
  private readonly homeBtn: Locator;
  private readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.homeBtn = page.getByRole('button', { name: 'Home' });
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
  }

  async clickHomeBtn() {
    await this.homeBtn.click();
  }

  async getHomeBtn(): Promise<Locator> {
    return this.homeBtn;
  }

  async isLogoutVisible(): Promise<Boolean> {
    return this.logoutBtn.isVisible();
  }

  async clickLogoutBtn() {
    await this.logoutBtn.click();
  }
}
