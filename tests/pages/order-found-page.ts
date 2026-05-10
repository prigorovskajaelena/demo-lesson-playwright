import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './base-page'

export class FoundPage extends BasePage {
  readonly orderDetails: Locator

  constructor(page: Page) {
    super(page)
    this.orderDetails = this.page.locator('.order-details')
  }
  async checkVisible(visible: boolean): Promise<void> {
    await expect(this.orderDetails).toBeVisible({ visible })
  }
}
