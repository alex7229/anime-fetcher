"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEpisodesListPage_1 = require("./pages/getEpisodesListPage");
const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch();
    const page = await getEpisodesListPage_1.default(browser);
    console.log(page);
    await browser.close();
})();
