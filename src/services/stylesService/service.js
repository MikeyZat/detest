// Created by Mikołaj Zatorski c. 2021

const { runPuppeteerTests } = require('./browserScrapper');

const {
  logger,
  setLoggerInDebug,
  revertLoggerLevel,
} = require('../../utils/logger');

const service = async (localConfig, globalConfig) => {
  try {
    const { test_cases: testCases, ...options } = localConfig;
    const config = setUpFinalConfig(options, globalConfig);
    const oldLogLevel = logger.level;
    if (config.debug) {
      setLoggerInDebug();
    }

    if (!config.url) {
      logger.error(`URL for test case: ${config.name} is not available`);
      return;
    }

    logger.debug('Running test cases with final config:');
    logger.debug(config);

    if (config.run !== false) {
      await runPuppeteerTests(config, testCases);
    }

    revertLoggerLevel(oldLogLevel);
  } catch (e) {
    logger.trace(e);
    logger.error(
      `Error occured while running service for styles tests: ${
        localConfig.name || globalConfig.name
      }`
    );
  }
};

const setUpFinalConfig = (localConfig, globalConfig) => ({
  ...globalConfig,
  ...localConfig,
  url: shapeLocalUrl(globalConfig.url, localConfig.url),
});

const shapeLocalUrl = (globalUrl, localUrl) => {
  if (localUrl) {
    if (globalUrl && localUrl.startsWith('/')) {
      return `${globalUrl}${localUrl}`;
    }
    return localUrl;
  }
  return globalUrl;
};

module.exports = service;
