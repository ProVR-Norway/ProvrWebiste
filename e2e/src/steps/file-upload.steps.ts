// Import the cucumber operators we need
import { Given, Then, When, Before, After } from 'cucumber';
import { AppPage } from '../app.po';
import { element, by } from 'protractor';
import { expect } from 'chai';

let page: AppPage;

Before('@Upload', async() => {
  page = new AppPage();
});

Given('I am logged in', async () => {
  // Navigate to login page
  await page.navigateToPath('account/login');
  // Find username and password input fields
  const username = await element(by.name('username'));
  const password = await element(by.name('password'));
  // Insert example username and password
  await username.sendKeys('Hei123');
  await password.sendKeys('Hei123@@');
  // Submit info
  await element(by.buttonText('Login')).click();
});

When('I choose a model to upload', async () => {
  const path = require('path');
  const fileToUpload = '../test-assets/RiggedFigure.gltf';
  const absolutePath = path.resolve(__dirname, fileToUpload);
  await element(by.css('input[type="file"]')).sendKeys(absolutePath);
});

When('I upload it', async () => {
  await element(by.buttonText('Upload')).click();
});

Then('I can find it in the collection of uploaded models', async () => {
  /**
   *  Assume that the model is visible in the collection when they are successfully uploaded
   */
  expect(await element(by.id('alert-message')).getText()).to.be.equal('Upload successful'); 
});

After('@Upload', async () => {
  await element(by.linkText('Logout')).click();
});