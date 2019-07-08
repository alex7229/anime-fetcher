import getEpisodesListPage from "./pages/getEpisodesListPage";
import * as puppeteer from "puppeteer";
import getEpisodesInfo from "./parser/getEpisodesInfo";

(async () => {
  const browser = await puppeteer.launch();
  const episodesPage = await getEpisodesListPage(browser);
  const episodesInfo = await getEpisodesInfo(episodesPage, 320);
  console.log(episodesInfo);
  await browser.close();
})();
