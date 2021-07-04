// Created by Mikołaj Zatorski c. 2021

const tap = require('tap');
const { runPuppeteerTests } = require('../common/commonPuppeteer');
const { logger } = require('../../utils/logger');

const runLayoutTests = async (config, testCases) =>
  await runPuppeteerTests(config, testCases, runTestCases);

const runTestCases = async (page, testCases) => {
  for (testCase of testCases) {
    await runTestCase(page, testCase);
  }
};

const runTestCase = async (page, testCase) => {
  const { selector, xpath, ...tests } = testCase;
  const { position, contains } = tests;
  const locator = selector || xpath;
  logger.info(position);
  logger.info(contains);

  await tap.test(
    `[LAYOUT SERVICE]: Checking element: ${locator}`,
    async (t) => {
      let element;
      try {
        element = await getElement(page, locator, !!selector);
      } catch (err) {
        logger.trace(err);
        element = null;
      }

      if (!element) {
        t.fail(`Element: ${locator} doesn't exist`);
        t.end();
        return;
      }

      logger.info(`test element: ${element}`);
      t.end();
    }
  );
};

const getElement = async (page, elementSelector, isSelector) =>
  isSelector
    ? await getElementWithSelector(page, elementSelector)
    : await getElementWithxPath(page, elementSelector);

const getElementWithSelector = async (page, selector) => await page.$(selector);

const getElementWithxPath = async (page, xPath) => {
  const nodeHandle = await page.$x(xPath);
  return nodeHandle[0];
};

module.exports = {
  runLayoutTests,
};
