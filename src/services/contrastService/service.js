// Created by Mikołaj Zatorski c. 2021

const { runContrastTests } = require('./testsRunner');
const genericService = require('../common/genericService');

const service = async (localConfig, globalConfig) =>
  await genericService(localConfig, globalConfig, runContrastTests);

module.exports = service;
