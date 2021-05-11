// Import the cucumber operators we need
import { Given, Then, When, Before, After } from 'cucumber';
import { AppPage } from '../app.po';
import { element, by } from 'protractor';
import { expect } from 'chai';

let page: AppPage;

Before('@Login', async() => {
  page = new AppPage();
});

Given('I am registered with an account', async () => {
  /** 
  *   Registration happens in a separate test, so we assume the account is already registered
  *   in this step.
  */
  // Navigate to login page
  await page.navigateToPath('account/login');
});

When('I enter my credentials', async () => {
  // Find username and password input fields
  const username = await element(by.name('username'));
  const password = await element(by.name('password'));
  // Insert example username and password
  await username.sendKeys('Hei123');
  await password.sendKeys('Hei123@@');
  // Submit info
  await element(by.buttonText('Login')).click();
});

Then('I have access to my account', async () => {
  // Expect that we see the username as logged in in the right top corner
  expect(await element(by.linkText('Hei123')).isPresent()).to.equal(true);
});

After('@Login', async () => {
  await element(by.linkText('Logout')).click();
});