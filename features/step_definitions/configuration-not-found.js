const {Given, Then, When} = require('cucumber');
const {By, until} = require('selenium-webdriver');

const chai = require('chai');
const expect = chai.expect;

let url;
let driver;
Given(/^a fixed error route URL (.*)$/,
  function(givenUrl) {
    const world = this;
    driver = world.driver;
    url = givenUrl;
  });
When(/^I access this URL$/, function() {
  driver.get(url);
});
Then(/^I'm shown an error page stating configuration wasn't found$/,
   async function() {
    const world = this;
    const errorPage = await driver.wait(until.elementLocated(By.css('.isotope-error-page')));
    const title = await errorPage.findElement(By.css('h1'));
    expect(await title.getAttribute('innerHTML')).to.equal('Sorry');
    const rootUrl = url.match(/^https?:\/\/[^/]*?\//)[0];
    expect(await errorPage.findElement(By.css('a')).getAttribute('href')).to.equal(rootUrl);
     const screenShot = await driver.takeScreenshot();
     world.attach(screenShot, 'image/png');
  });
