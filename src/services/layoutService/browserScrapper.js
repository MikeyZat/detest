// Created by Mikołaj Zatorski c. 2021

const { runPuppeteerTests } = require('../common/commonPuppeteer');

const runLayoutTests = async (config, testCases) =>
  await runPuppeteerTests(config, testCases, runTestCases);

const runTestCases = async (page, testCases) => {
  for (testCase of testCases) {
    await runTestCase(page, testCase);
  }
};

const runTestCase = async (page, testCase) => {
  console.log(page);
  console.log(testCase);
};

module.exports = {
  runLayoutTests,
};
