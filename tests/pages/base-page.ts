import { expect, Locator, Page } from '@playwright/test'

export class  BasePage {
  readonly page: Page
  readonly footer:Locator;
  readonly langBtnRu:Locator;
  readonly langBtnEng:Locator;
  readonly navFooter:Locator;

  constructor(page:Page) {
    this.page = page;
    this.footer=page.locator('.Footer'); //здесь мы ищем не кнопки,
    // а нижнюю область сайта,
    //где эти кнопки размещаются?
    //если да, то не понимаю зачем
    this.langBtnRu = this.footer.locator('.language__button ').nth(1);
    this.langBtnEng = this.footer.locator('.language__button ').nth(0);
    this.navFooter = this.footer.locator('.nav-footer')
  }

  async checkFooterComponents(): Promise<void> {
    await expect(this.langBtnRu).toBeVisible();
    await expect(this.langBtnEng).toBeVisible()
    await expect(this.navFooter).toBeVisible()

  }
}