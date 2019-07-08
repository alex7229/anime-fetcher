import downloadEpisod from "./downloadEpisode";

// import getEpisodesListPage from "./pages/getEpisodesListPage";
// import * as puppeteer from "puppeteer";
// import getEpisodesInfo from "./parser/getEpisodesInfo";

(async () => {
  // const browser = await puppeteer.launch();
  // const episodesPage = await getEpisodesListPage(browser);
  // const episodesInfo = await getEpisodesInfo(episodesPage, 320);
  // console.log(episodesInfo);
  // await browser.close();
  await downloadEpisod({
    url:
      "https://www348.playercdn.net/87/1/fJRElB8LujoBW4zisOsVkw/1562605034/190125/741FZJB9AY5V4YUPMJ8DS.mp4",
    episodeNumber: 422
  });
  console.log("download was finished");
})();
