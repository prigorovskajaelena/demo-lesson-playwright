import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'
import { NotFoundPage } from './order-not-found-page'

export class OrderPage extends BasePage {
  readonly page: Page
  readonly title: Locator
  readonly statusButton: Button
  readonly createOrderButton: Button
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly popupField: Locator
  readonly logoutButton: Button
  // add more locators here
// search popup

  protected readonly searchPopup: Locator
  readonly searchInput: Locator
  readonly searchButton: Button

  constructor(page: Page) {
    super(page)
    this.page = page
    this.title = page.locator('.new-order__title')
    this.statusButton = new Button(page.getByTestId('openStatusPopup-button'))
    this.createOrderButton = new Button(page.getByTestId('createOrder-button'))
    this.nameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.popupField = page.getByTestId('orderSuccessfullyCreated-popup')
    this.logoutButton = new Button(page.getByTestId('logout-button'))

    //search popup

    this.searchPopup = page.getByTestId('searchOrder-popup')
    this.searchInput = this.searchPopup.getByTestId('searchOrder-input')
    this.searchButton = new Button(this.searchPopup.getByTestId('searchOrder-submitButton'))
  }
  async checkInnerComponents(): Promise<void> {
    await expect(this.title).toBeVisible()
    await this.statusButton.checkVisible(true)
    await this.createOrderButton.checkVisible(true)
    await expect(this.nameInput).toBeVisible()
    await expect(this.phoneInput).toBeVisible()
    await expect(this.commentInput).toBeVisible()
    await this.logoutButton.checkVisible(true)
  }

  async createOrder(): Promise<void> {
    await this.nameInput.fill(faker.person.firstName())
    await this.phoneInput.fill(faker.phone.number())
    await this.commentInput.fill(faker.lorem.word(10))
    await this.createOrderButton.click()
    await expect(this.popupField).toBeVisible()
  }

  // async checkLogoutButton(): Promise<LoginPage> {
  //   await this.logoutButton.click()
  //   return new LoginPage(this.page)
  // }
  async checkOrderNotFound(): Promise<NotFoundPage> {
    await this.statusButton.click()
    await this.searchInput.fill('0')
    await this.searchButton.click()
    return new NotFoundPage(this.page)
  }

}
