import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { LoginPage } from './login-page'

export class OrderPage {
  readonly page: Page
  readonly title: Locator
  readonly statusButton: Locator
  readonly createOrderButton: Locator
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly popupField: Locator
  readonly logoutButton: Locator
  // add more locators here

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('h2')
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.nameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.popupField = page.getByTestId('orderSuccessfullyCreated-popup')
    this.logoutButton = page.getByTestId('logout-button')
  }
  async checkInnerComponents(): Promise<void> {
    await expect(this.title).toBeVisible()
    await expect(this.statusButton).toBeVisible()
    await expect(this.createOrderButton).toBeVisible()
    await expect(this.nameInput).toBeVisible()
    await expect(this.phoneInput).toBeVisible()
    await expect(this.commentInput).toBeVisible()
    await this.checkCreateOrderBtnEnabled(true)
    await expect(this.logoutButton).toBeVisible()
  }

  async createOrder(): Promise<void> {
    await this.nameInput.fill(faker.person.firstName())
    await this.phoneInput.fill(faker.phone.number())
    await this.commentInput.fill(faker.lorem.word(10))
    await this.createOrderButton.click()
    await expect(this.popupField).toBeVisible()
  }
  async checkCreateOrderBtnEnabled(enabled: boolean): Promise<void> {
    await expect(this.createOrderButton).toBeEnabled({ enabled })

    //await expect(this.createOrderButton).toBeDisabled({ timeout: 10000 });
  }

  async checkLogoutButton(): Promise<LoginPage> {
    await this.logoutButton.click()
    return new LoginPage(this.page)
  }
}



