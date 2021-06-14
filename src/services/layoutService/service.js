// Created by Mikołaj Zatorski c. 2021

const genericService = require('../common/genericService');
const { runLayoutTests } = require('../layoutService/browserScrapper');

const service = async (localConfig, globalConfig) =>
  await genericService(localConfig, globalConfig, runLayoutTests);

module.exports = service;
