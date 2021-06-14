// Created by Mikołaj Zatorski c. 2021

const { runStylesTests } = require('./testsRunner');
const genericService = require('../common/genericService');

const service = async (localConfig, globalConfig) =>
  await genericService(localConfig, globalConfig, runStylesTests);

module.exports = service;
