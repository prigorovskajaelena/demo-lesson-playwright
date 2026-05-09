import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { faker } from '@faker-js/faker'

test('Login test and order page components check', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.checkInnerComponents()
  await loginPage.checkFooterComponents()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()
  await orderPage.checkFooterComponents()
})
test('Create order test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.createOrder()
})

test('check CreateOrderBtnEnabled', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill(faker.lorem.word(1))
  await orderPage.createOrderButton.checkOrBtEnabled(false)

  await orderPage.nameInput.fill(faker.lorem.word(1))
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.createOrderButton.checkOrBtEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.createOrderButton.checkOrBtEnabled(true)
})
test('Check logout button', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  //await expect(orderPage).checkInnerComponents
  await orderPage.logoutButton.click()
  // await expect(loginPage.usernameField).toBeVisible()
  // await expect(loginPage.passwordField).toBeVisible()
  // await expect(loginPage.signInButton).toBeVisible()
  //console.log(await page.url())
  await loginPage.checkInnerComponents()



  //await orderPage.checkLogoutButton()
})
