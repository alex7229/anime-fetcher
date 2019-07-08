import { Page } from "puppeteer";

interface EpisodeInfo {
  readonly url: string;
  readonly episode: number;
}
type GetEpisodesInfo = (
  page: Page,
  sinceEpisodeNumber: number
) => Promise<EpisodeInfo[]>;

const getEpisodesInfo: GetEpisodesInfo = async (page, sinceEpisodeNumber) => {
  return [];
};

export default getEpisodesInfo;
