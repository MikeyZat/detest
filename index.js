// Created by Mikołaj Zatorski c. 2021

const yaml = require('js-yaml');
const fs = require('fs');
const { logger, setLoggerInDebug } = require('./src/utils/logger');
const BrowserSingleton = require('./src/utils/browser');
const mergeOptions = require('./src/utils/mergeOptions');
const { STYLES, LAYOUT, CONTRAST } = require('./src/utils/const');
const logTestSummary = require('./src/utils/testSummary');
const setExitCode = require('./src/utils/setExitCode');
const { TESTS_EXAMPLE } = require('./src/utils/helpExamples');
const stylesService = require('./src/services/stylesService');
const layoutService = require('./src/services/layoutService');
const contrastService = require('./src/services/contrastService');

const testTypesServices = {
  [STYLES]: stylesService,
  [LAYOUT]: layoutService,
  [CONTRAST]: contrastService,
};

const main = async (fileName, options) => {
  try {
    const testConfig = yaml.safeLoad(fs.readFileSync(fileName, 'utf8'));
    const { global: globalConfig, tests } = testConfig;

    const mergedGlobalConfig = mergeOptions(globalConfig, options);

    if (mergedGlobalConfig.debug) {
      setLoggerInDebug();
    }

    if (Array.isArray(tests)) {
      for (let test of tests) {
        await handleTest(test, mergedGlobalConfig);
      }

      logTestSummary();
      setExitCode();

      await BrowserSingleton.closeBrowser();
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

const handleTest = async (test, globalConfig) => {
  const { type, ...localConfig } = test;
  const testService = testTypesServices[type?.toUpperCase() || ''];

  if (testService) {
    await testService(localConfig, globalConfig);
  } else {
    logger.error(
      `Unsupported test type ${type}. Check out the documentation for supported test types.`
    );
  }
};

module.exports = main;
