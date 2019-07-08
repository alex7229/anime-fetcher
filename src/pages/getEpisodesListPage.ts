import { Browser } from "puppeteer";

const getEpisodesListPage = async (browser: Browser) => {
  const page = await browser.newPage();
  await page.goto("https://kissanime.ru/Anime/Naruto-Shippuuden-Dub");
  await page.waitFor("table.listing");
  return page;
};

export default getEpisodesListPage;
