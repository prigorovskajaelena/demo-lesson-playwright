import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, SERVICE_URL, USERNAME } from '../../config/env-data'
import { faker } from '@faker-js/faker'

test('Login test and order page components check', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()
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
  await orderPage.checkCreateOrderBtnEnabled(false)

  await orderPage.nameInput.fill(faker.lorem.word(1))
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.checkCreateOrderBtnEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.checkCreateOrderBtnEnabled(true)
})
test('Check logout button', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.checkLogoutButton()
})
