#!/usr/bin/env node
const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const {sep} = require('path');
const {REPORTS_LOCATION, JSON_REPORT, PUBLIC_LOCATION} = require('./constants.js');
const {deleteDirectory, mkdirRecursive} =  require('./utils');
const localEnv = process.env.TRAVIS_BUILD_NUMBER ? false : true;

const outputFile = `${REPORTS_LOCATION}${sep}cucumber_report.html`;

const options = {
  theme: 'bootstrap',
  jsonFile: JSON_REPORT,
  output: outputFile,
  reportSuiteAsScenarios: true,
  launchReport: localEnv,
  name: "Isotope Mail Client e2e tests",
  brandTitle: "End-to-End tests",
  metadata: {
    "Project home": "<a href='https://github.com/manusa/isotope-mail'>Isotope Mail Client</a>",
    "Project tests home": "<a href='https://github.com/manusa/isotope-mail-e2e-tests'>Isotope Mail Client e2e tests</a>",
  }
};

reporter.generate(options);

deleteDirectory(PUBLIC_LOCATION);
mkdirRecursive(PUBLIC_LOCATION);
fs.copyFileSync(outputFile, `${PUBLIC_LOCATION}${sep}index.html`);
