import { Locator, Page } from '@playwright/test';

export class AddCustomerPage {
  private readonly addCustomerTab: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postCodeInput: Locator;
  private readonly addCustomerBtn: Locator;

  constructor(page: Page) {
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' }).first();
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postCodeInput = page.getByRole('textbox', { name: 'Post Code' });
    this.addCustomerBtn = page.getByRole('button', { name: 'Add Customer' }).last();
  }

  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async enterFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async enterPostCode(postCode: string) {
    await this.postCodeInput.fill(postCode);
  }

  async clickAddCustomerBtn() {
    await this.addCustomerBtn.click();
  }
}
