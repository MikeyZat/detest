// Created by Mikołaj Zatorski c. 2021

const pino = require('pino');

const DEBUG_LEVEL = 'debug';

const logger = pino({
  prettyPrint: {
    levelFirst: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
  },
});

const setLoggerInDebug = () => {
  logger.level = DEBUG_LEVEL;
};

const revertLoggerLevel = (oldLogLevel) => {
  logger.level = oldLogLevel;
};

module.exports = {
  logger,
  setLoggerInDebug,
  revertLoggerLevel,
};
