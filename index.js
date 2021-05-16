// Created by Mikołaj Zatorski c. 2021

const yaml = require('js-yaml');
const fs = require('fs');
const logger = require('./src/utils/logger');
const mergeOptions = require('./src/utils/mergeOptions');
const { STYLES, LAYOUT } = require('./src/utils/const');
const { TESTS_EXAMPLE } = require('./src/utils/helpExamples');

const testTypesServices = {
  [STYLES]: (localConfig, globalConfig, logger) => {
    logger.info(localConfig, globalConfig);
  },
  [LAYOUT]: (localConfig, globalConfig, logger) => {
    logger.info(localConfig, globalConfig);
  },
};

const main = (fileName, options) => {
  try {
    logger.level = 'trace';
    const testConfig = yaml.safeLoad(fs.readFileSync(fileName, 'utf8'));
    const { global: globalConfig, tests } = testConfig;

    const mergedGlobalConfig = mergeOptions(globalConfig, options);

    if (Array.isArray(tests)) {
      tests.forEach((test) => handleTest(test, mergedGlobalConfig, logger));
    } else {
      logger.error(
        `tests must be an array. Check out the documentation or see the example below:${TESTS_EXAMPLE}`
      );
    }
  } catch (e) {
    logger.trace(e);
    logger.error(
      `Either file ${fileName} doesn't exist or it doesn't follow correct yaml format.`
    );
  }
};

const handleTest = (test, globalConfig, logger) => {
  const { type, ...localConfig } = test;
  const testService = testTypesServices[type?.toUpperCase() || ''];

  if (testService) {
    testService(localConfig, globalConfig, logger);
  } else {
    logger.error(
      `Unsupported test type ${type}. Check out the documentation for supported test types.`
    );
  }
};

module.exports = main;
