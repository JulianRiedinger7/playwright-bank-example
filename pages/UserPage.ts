import { Locator, Page } from '@playwright/test';

export class UserPage {
  private readonly userWelcome: Locator;

  constructor(page: Page) {
    this.userWelcome = page.locator('strong > span');
  }

  getUserWelcome(): Locator {
    return this.userWelcome;
  }
}
