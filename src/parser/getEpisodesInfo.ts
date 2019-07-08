import { Page } from "puppeteer";
import parseEpisodeUrl from "./parseEpisodeUrl";

export interface EpisodeInfo {
  readonly url: string;
  readonly episodeNumber: number;
}
type GetEpisodesInfo = (
  page: Page,
  sinceEpisodeNumber: number
) => Promise<EpisodeInfo[]>;

const getEpisodesInfo: GetEpisodesInfo = async (page, sinceEpisodeNumber) => {
  const links = await page.evaluate(() =>
    [...document.querySelectorAll("table.listing a")].map(elem =>
      elem.getAttribute("href")
    )
  );
  return links
    .map(link => parseEpisodeUrl(link))
    .filter((link): link is EpisodeInfo => link !== null)
    .filter(link => link.episodeNumber > sinceEpisodeNumber);
};

export default getEpisodesInfo;
