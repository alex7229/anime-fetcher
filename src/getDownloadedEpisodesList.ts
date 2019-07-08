import * as fs from "fs";
import * as util from "util";
import * as Path from "path";

const readDirectory = util.promisify(fs.readdir);

type GetDownloadedEpisodesList = () => Promise<number[]>;

const getDownloadedEpisodesList: GetDownloadedEpisodesList = async () => {
  const files = await readDirectory(Path.resolve(__dirname, "../media"));
  const downloadedEpisodes = files
    .map(fileName => {
      const regExp = /(\d*).mp4/;
      const match = fileName.match(regExp);
      if (match === null) {
        return null;
      }
      return parseInt(match[1], 10);
    })
    .filter((fileNumber): fileNumber is number => fileNumber !== null);
  // watched episodes list is used in order not to download first 320 episodes
  const watchedEpisodes = Array(320)
    .fill(1)
    .map((value, index) => index + 1);
  return [...watchedEpisodes, ...downloadedEpisodes];
};

export default getDownloadedEpisodesList;
