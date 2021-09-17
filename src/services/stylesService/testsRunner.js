// Created by Mikołaj Zatorski c. 2021

const tap = require('tap');
const { logger } = require('../../utils/logger');
const { runPuppeteerTests } = require('../common/commonPuppeteer');
const { normalizeStyles } = require('./normalizeStyles');

const runStylesTests = async (config, testCases) =>
  await runPuppeteerTests(config, testCases, runTestCases);

const runTestCases = async (page, testCases) => {
  for (let testCase of testCases) {
    await runTestCase(page, testCase);
  }
};

const runTestCase = async (page, testCase) => {
  const { selector, xpath, ...expectedStyles } = testCase;
  const locator = selector || xpath;

  await tap.test(
    `[STYLES SERVICE]: Checking element: ${locator}`,
    async (t) => {
      let actualStyles;
      try {
        actualStyles = await getStylesToCompare(
          page,
          locator,
          expectedStyles,
          !!selector
        );
      } catch (err) {
        logger.trace(err);
        actualStyles = false;
      }
      t.ok(actualStyles, `check if element ${locator} exists`);
      if (actualStyles) {
        t.same(
          normalizeStyles(actualStyles),
          normalizeStyles(expectedStyles),
          `compare if element ${locator} styles match`
        );
      }
      t.end();
    }
  );
};

const getStylesToCompare = async (
  page,
  elementSelector,
  expectedStyles,
  isSelector
) =>
  isSelector
    ? await getStylesWithSelector(page, elementSelector, expectedStyles)
    : await getStylesWithxPath(page, elementSelector, expectedStyles);

const getStylesWithSelector = async (page, selector, expectedStyles) =>
  await page.$eval(selector, getElementStyles, expectedStyles);

const getStylesWithxPath = async (page, xPath, expectedStyles) => {
  const nodeHandle = await page.$x(xPath);
  return await page.evaluate(getElementStyles, nodeHandle[0], expectedStyles);
};

const getElementStyles = (node, testedStyles) => {
  // eslint-disable-next-line
  const nodeStyles = window.getComputedStyle(node);
  const shapedStyles = {};
  for (let property in testedStyles) {
    shapedStyles[property] = nodeStyles.getPropertyValue(property);
  }
  return shapedStyles;
};

module.exports = {
  runStylesTests,
};
