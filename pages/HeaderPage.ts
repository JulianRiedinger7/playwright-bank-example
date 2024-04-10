import { Locator, Page } from '@playwright/test';

export class HeaderPage {
  private readonly homeBtn: Locator;
  private readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.homeBtn = page.getByRole('button', { name: 'Home' });
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
  }

  getHomeBtn(): Locator {
    return this.homeBtn;
  }

  getLogoutBtn(): Locator {
    return this.logoutBtn;
  }
}
