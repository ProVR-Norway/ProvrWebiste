// Import the cucumber operators we need
import { Given, Then, When, Before, AfterAll } from 'cucumber';
import { AppPage } from '../app.po';
import { element, by } from 'protractor';
import { expect } from 'chai';

let page: AppPage;

Before('@Registration', async() => {
  page = new AppPage();
});

Given('my details differ from an already registered account', async () => {
  // Navigate to the registration page
  await page.navigateToPath('account/register');
});

When('I enter the required details', async () => {
  // Find email, username and password input fields
  const email = await element(by.name('emailAddress'));
  const username = await element(by.name('username'));
  const password = await element(by.name('password'));
  // Insert example email, username and password
  await email.sendKeys('ProtractorCucumber@test123.com'); // Must set new email for each test. De-register user will come later to avoid this
  await username.sendKeys('ProtractorCucumberUsername123') // Must set new username for each test. De-register user will come later to avoid this
  await password.sendKeys('ProtractorCucumberPassword123@@');
  // Submit info
  await element(by.buttonText('Register')).click();
});

Then('an account is created', async () => {
  // Expect that we get the correct message showing
  expect(await element(by.id('alert-message')).getText()).to.be.equal('Registration successful'); 
});

/*
AfterAll( async () =>{
  page.de_register('ProtractorCucumberUsername');
});
*/