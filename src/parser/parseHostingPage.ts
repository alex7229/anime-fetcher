import { Browser } from "puppeteer";

type ActualVideoUrl = string;
type ParseHostingPage = (
  browser: Browser,
  url: string
) => Promise<ActualVideoUrl>;

const parseHostingPage: ParseHostingPage = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("video");
  const actualUrl = await page.evaluate(() => {
    const source = document.querySelector("video source:last-child");
    if (source === null) {
      throw new Error("cannot parse hosting page for the next url: " + url);
    }
    return source.getAttribute("src");
  });
  if (actualUrl === null) {
    throw new Error("cannot parse hosting page for the next url: " + url);
  }
  await page.close();
  return actualUrl;
};

export default parseHostingPage;
