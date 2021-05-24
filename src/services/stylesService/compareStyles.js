// Created by Mikołaj Zatorski c. 2021
const { logger } = require('../../utils/logger');

const compareStyles = (expectedStyles, actualStyles) => {
  logger.debug('Expected styles');
  logger.debug(expectedStyles);
  logger.debug('Actual styles');
  logger.debug(actualStyles);
};

module.exports = compareStyles;
