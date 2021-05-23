// Created by Mikołaj Zatorski c. 2021

const BrowserSingleton = require('../../utils/browser');
const { logger } = require('../../utils/logger');

const runPuppeteerTests = async (config, testCases) => {
  const { url, width, height, timeout } = config;

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
  logger.debug('Test cases:');
  logger.debug(testCases);
};

module.exports = {
  runPuppeteerTests,
};
