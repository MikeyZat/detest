// Created by Mikołaj Zatorski c. 2021

const BrowserSingleton = require('../../utils/browser');
const { logger } = require('../../utils/logger');
const compareStyles = require('./compareStyles');

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

  try {
    if (selector) {
      const actualStyles = await getStylesWithSelector(
        page,
        selector,
        expectedStyles
      );
      return compareStyles(expectedStyles, actualStyles);
    }

    const actualStyles = await getStylesWithxPath(page, xpath, expectedStyles);
    return compareStyles(expectedStyles, actualStyles);
  } catch (err) {
    // fail the test
    logger.trace(err);
    logger.error(
      `Element with selector/xpath ${selector || xpath} doesnt exist`
    );
  }
};

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
