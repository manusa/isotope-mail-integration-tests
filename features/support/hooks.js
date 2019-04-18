
const {After, Before, BeforeAll, AfterAll, setDefaultTimeout} = require('cucumber');
const webdriver = require('selenium-webdriver');

const TIMEOUT = 60*1000;
const travisBuild = process.env.TRAVIS_BUILD_NUMBER;
const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
const browsers = {
  chrome: {browserName: 'Chrome', browserVersion: '65'},
  edge: {browserName: 'Edge', browserVersion: '18.0'},
};

setDefaultTimeout(TIMEOUT);

const createBrowserStackSession = (browser = browsers.edge) =>
  new webdriver.Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities({
    projectName : 'Isotope Mail Client',
    buildName: travisBuild ? 'CI' : 'local',
    browserName: browser.browserName,
    browserVersion: browser.browserVersion,
    'bstack:options': {
      userName: username,
      accessKey: accessKey,
      os: 'Windows',
      osVersion : '10',
      resolution : '1920x1080',
    },
  })
  .build();

const driver = {};

BeforeAll(function() {
  const world = this;
  driver.chrome = createBrowserStackSession(browsers.chrome);
  driver.edge = createBrowserStackSession(browsers.edge);
});
Before(function () {
  const world = this;
  world.driver = driver;
});
// Before(function (scenario, callback) {
//   const world = this;
//   world.driver = createBrowserStackSession();
//   callback();
// });
AfterAll(function() {
  driver.chrome.quit();
  driver.edge.quit();
});
// After(async function (scenario) {
//   const world = this;
//   world.driver.quit();
// });
