// Created by Mikołaj Zatorski c. 2021
const puppeteer = require('puppeteer');
const { logger } = require('./logger');

class BrowserClass {
  constructor() {
    this._browser = null;
  }

  async getBrowser() {
    logger.debug('Getting puppeteer browser');
    if (this._browser) {
      logger.debug('Returning browser reference as its already launched');
      return this._browser;
    }

    logger.debug('Launching puppeteer browser...');
    this._browser = await puppeteer.launch();
    logger.debug('Browser launched');
    return this._browser;
  }

  async closeBrowser() {
    logger.debug('Closing puppeteer browser');
    try {
      if (this._browser) {
        logger.debug('Browser exists, closing...');
        await this._browser.close();
        this._browser = null;
        logger.debug('Browser closed');
      }
      return true;
    } catch (err) {
      logger.trace(err);
      return false;
    }
  }
}
module.exports = new BrowserClass();
