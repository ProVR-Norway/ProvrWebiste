// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/**
 * @type { import("protractor").Config }
 */

exports.config = {
  // set to "custom" instead of cucumber.
  framework: 'custom',

  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  //seleniumAddress: 'http://localhost:4444/wd/hub',
  // require feature files
  specs: [
    './src/specs/*.feature' // accepts a glob
  ],
  cucumberOpts: {
    // require step definitions
    require: [
      './src/steps/*.steps.ts' // accepts a glob
    ]
  },
  allScriptsTimeout: 11000,
  capabilities: {
    browserName: 'chrome'
  },
  chromeOptions: {
    // set chrome to fullscreen mode
    args: [
        '--start-maximized'
    ]
  },
  //directConnect: true,
  baseUrl: 'http://localhost:4200/',
  directConnect: true,
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  }
};