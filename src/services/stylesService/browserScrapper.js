// Created by Mikołaj Zatorski c. 2021

const tap = require('tap');
const BrowserSingleton = require('../../utils/browser');
const { logger } = require('../../utils/logger');
const normalizeStyles = require('./normalizeStyles');

const runPuppeteerTests = async (config, testCases) => {
  const { url, width, height, timeout, name } = config;

  const browser = await BrowserSingleton.getBrowser();
  const page = await browser.newPage();
  await page.setDefaultTimeout(timeout || 15000);

  if (width || height) {
    await page.setViewport({
      width: width || 800,
      height: height || 600,
    });
  }

  await page.goto(url);
  logger.debug(`Running test: ${name} with ${testCases.length} test-cases`);

  await runTestCases(page, testCases);
};

const runTestCases = async (page, testCases) => {
  for (testCase of testCases) {
    await runTestCase(page, testCase);
  }
};

const runTestCase = async (page, testCase) => {
  const { selector, xpath, ...expectedStyles } = testCase;

  await tap.test(
    'Check if elements exists and have correct styles',
    async (t) => {
      let actualStyles;
      try {
        actualStyles = await getStylesToCompare(
          page,
          selector || xpath,
          expectedStyles,
          !!selector
        );
      } catch (err) {
        logger.trace(err);
        actualStyles = false;
      }
      t.ok(actualStyles, `check if element ${selector || xpath} exists`);
      if (actualStyles) {
        t.same(
          normalizeStyles(actualStyles),
          normalizeStyles(expectedStyles),
          `compare if element ${selector || xpath} styles match`
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
  const nodeStyles = window.getComputedStyle(node);
  const shapedStyles = {};
  for (property in testedStyles) {
    shapedStyles[property] = nodeStyles.getPropertyValue(property);
  }
  return shapedStyles;
};

module.exports = {
  runPuppeteerTests,
};
