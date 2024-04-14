import { Locator, Page } from '@playwright/test';

type customerInfo = 'firstName' | 'lastName' | 'postCode';

export class CustomersPage {
  private readonly customersTab: Locator;
  private readonly searchCustomerInput: Locator;
  private readonly searchResultFirstName: Locator;
  private readonly searchResultLastName: Locator;
  private readonly searchResultPostCode: Locator;
  private readonly searchResultDeleteBtn: Locator;

  constructor(page: Page) {
    this.customersTab = page.getByRole('button', { name: 'Customers' });
    this.searchCustomerInput = page.getByRole('textbox', { name: 'Search Customer' });
    this.searchResultFirstName = page.locator('//table[contains(@class, "table")]//tbody//td[1]');
    this.searchResultLastName = page.locator('//table[contains(@class, "table")]//tbody//td[2]');
    this.searchResultPostCode = page.locator('//table[contains(@class, "table")]//tbody//td[3]');
    this.searchResultDeleteBtn = page.locator('//table[contains(@class, "table")]//tbody//td[5]//button');
  }

  async clickCustomersTab() {
    await this.customersTab.click();
  }

  async enterSearch(customerName: string) {
    await this.searchCustomerInput.fill(customerName);
  }

  async isSearchResultFirstNameVisible(): Promise<Boolean> {
    return this.searchResultFirstName.isVisible();
  }

  async iscustomerInfoCorrect(customerInfoType: customerInfo, customerInfoData: string): Promise<Boolean> {
    switch (customerInfoType) {
      case 'firstName':
        const searchResultFirstNameText = await this.searchResultFirstName.textContent();
        return searchResultFirstNameText === customerInfoData ? true : false;
      case 'lastName':
        const searchResultLastNameText = await this.searchResultLastName.textContent();
        return searchResultLastNameText === customerInfoData ? true : false;
      case 'postCode':
        const searchResultPostCodeText = await this.searchResultPostCode.textContent();
        return searchResultPostCodeText === customerInfoData ? true : false;
    }
  }

  async clickSearchResultDeleteBtn() {
    await this.searchResultDeleteBtn.click();
  }
}
