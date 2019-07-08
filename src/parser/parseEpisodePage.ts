import { Browser } from "puppeteer";

type RapidVideoHostingUrl = string;
type ParseEpisodePage = (
  url: string,
  browser: Browser
) => Promise<RapidVideoHostingUrl>;

const parseEpisodePage: ParseEpisodePage = async (url, browser) => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("iframe#my_video_1");
  const rapidHostingPageUrl = await page.evaluate(() => {
    const element = document.querySelector("#my_video_1");
    if (element === null) {
      throw new Error("cannot find video url for next video: " + url);
    }
    return element.getAttribute("src");
  });
  await page.close();
  if (rapidHostingPageUrl === null) {
    throw new Error("cannot find video url for next video: " + url);
  }
  return rapidHostingPageUrl;
};

export default parseEpisodePage;
