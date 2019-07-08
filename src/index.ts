import downloadEpisode from "./downloadEpisode";
import * as puppeteer from "puppeteer";
import parseEpisodesListPage from "./parser/parseEpisodesListPage";
import getDownloadedEpisodesList from "./getDownloadedEpisodesList";
import parseEpisodePage from "./parser/parseEpisodePage";
import parseHostingPage from "./parser/parseHostingPage";

(async () => {
  const downloadedEpisodes = await getDownloadedEpisodesList();
  const browser = await puppeteer.launch();
  const allEpisodesInfo = await parseEpisodesListPage(browser);
  const newEpisodesInfo = allEpisodesInfo
    .filter(info => !downloadedEpisodes.includes(info.episodeNumber))
    .reverse();

  for (const episodeInfo of newEpisodesInfo) {
    const episodeHostingPageUrl = await parseEpisodePage(
      episodeInfo.url,
      browser
    );
    const actualVideoUrl = await parseHostingPage(
      browser,
      episodeHostingPageUrl
    );
    await downloadEpisode({
      url: actualVideoUrl,
      episodeNumber: episodeInfo.episodeNumber
    });
  }

  await browser.close();
})();
