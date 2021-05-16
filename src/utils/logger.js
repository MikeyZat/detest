// Created by Mikołaj Zatorski c. 2021

const pino = require('pino');

const logger = pino({
  prettyPrint: {
    levelFirst: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
  },
});

module.exports = logger;
