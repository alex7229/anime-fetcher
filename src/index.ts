// import downloadEpisode from "./downloadEpisode";
import * as puppeteer from "puppeteer";
import parseEpisodesListPage from "./parser/parseEpisodesListPage";
import getDownloadedEpisodesList from "./getDownloadedEpisodesList";
import parseEpisodePage from "./parser/parseEpisodePage";
import parseHostingPage from "./parser/parseHostingPage";

(async () => {
  const downloadedEpisodes = await getDownloadedEpisodesList();
  const browser = await puppeteer.launch();
  const allEpisodesInfo = await parseEpisodesListPage(browser);
  const newEpisodesInfo = allEpisodesInfo.filter(
    info => !downloadedEpisodes.includes(info.episodeNumber)
  );
  const kissanimeEpisodePageUrl = newEpisodesInfo[22].url;
  const episodeHostingPageUrl = await parseEpisodePage(
    kissanimeEpisodePageUrl,
    browser
  );
  const actualVideoUrl = await parseHostingPage(browser, episodeHostingPageUrl);
  console.log(kissanimeEpisodePageUrl);
  console.log(episodeHostingPageUrl);
  console.log(actualVideoUrl);
  await browser.close();

  // await downloadEpisode({
  //   url:
  //     "https://www348.playercdn.net/87/1/fJRElB8LujoBW4zisOsVkw/1562605034/190125/741FZJB9AY5V4YUPMJ8DS.mp4",
  //   episodeNumber: 422
  // });
})();
