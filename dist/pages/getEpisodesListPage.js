"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEpisodesListPage = async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://kissanime.ru/Anime/Naruto-Shippuuden-Dub");
    await page.waitFor("a.bigChar");
    return page;
};
exports.default = getEpisodesListPage;
