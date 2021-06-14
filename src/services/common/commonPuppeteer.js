// Created by Mikołaj Zatorski c. 2021

const BrowserSingleton = require('../../utils/browser');
const { logger } = require('../../utils/logger');

const runPuppeteerTests = async (config, testCases, runTestCasesFunction) => {
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

  try {
    await page.goto(url);
  } catch (err) {
    logger.trace(err);
    logger.error(`Connection refused - couldn't access ${url}`);
    throw err;
  }
  logger.debug(`Running test: ${name} with ${testCases.length} test-cases`);

  return await runTestCasesFunction(page, testCases);
};

module.exports = {
  runPuppeteerTests,
};
