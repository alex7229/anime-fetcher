import { Browser } from "puppeteer";
import parseEpisodeUrl from "./parseEpisodeUrl";

export interface EpisodeInfo {
  readonly url: string;
  readonly episodeNumber: number;
}
type ParseEpisodesListPage = (browser: Browser) => Promise<EpisodeInfo[]>;

const parseEpisodesListPage: ParseEpisodesListPage = async browser => {
  const page = await browser.newPage();
  await page.goto("https://kissanime.ru/Anime/Naruto-Shippuuden-Dub");
  await page.waitFor("table.listing");
  const links = await page.evaluate(() =>
    [...document.querySelectorAll("table.listing a")].map(elem =>
      elem.getAttribute("href")
    )
  );
  await page.close();
  return links
    .map(link => parseEpisodeUrl(link))
    .filter((link): link is EpisodeInfo => link !== null);
};

export default parseEpisodesListPage;
