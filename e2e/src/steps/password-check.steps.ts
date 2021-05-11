// Import the cucumber operators we need
import { Given, Then, When, Before, After } from 'cucumber';
import { AppPage } from '../app.po';
import { element, by } from 'protractor';
import { expect } from 'chai';

let page: AppPage;

Before('@PasswordTest', async() => {
  page = new AppPage();
});

Given('I am on the registration page', async () => {
  // Navigate to the registration page
  await page.navigateToPath('account/register');
});

Given('I have entered a valid email and username', async () => {
  // Navigate to the registration page
  await page.navigateToPath('account/register');
  // Find email and username input fields
  const email = await element(by.name('emailAddress'));
  const username = await element(by.name('username'));
  // Insert example email and username
  await email.sendKeys('ProtractorCucumber@test.com');
  await username.sendKeys('ProtractorCucumberUsername')
});

When('I enter a password that is at least 8 characters long, has at least one capital and lowercase letter, and a special character', async () => {
  const password = await element(by.name('password'));
  await password.sendKeys('#Strong99');
});

Then('I will be able to create an account', async () => {
  expect(await element(by.id('bar3')).getCssValue('background-color')).to.be.equal('rgba(0, 255, 0, 1)');
});

/*
After('@PasswordTest', async () => {

});
*/