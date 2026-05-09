import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'

//const correctOrderId = 17940;


test ('Not found test page', async ({ page }) => {
  const loginPage= new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  const notFoundPage=await orderPage.checkOrderNotFound()
  await notFoundPage.checkVisible(true)

})