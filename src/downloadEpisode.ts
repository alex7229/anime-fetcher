import * as fs from "fs";
import * as Path from "path";
import Axios from "axios";
import { EpisodeInfo } from "./parser/parseEpisodesListPage";

type DownloadEpisode = (episodeInfo: EpisodeInfo) => Promise<void>;

const downloadEpisode: DownloadEpisode = async ({ url, episodeNumber }) => {
  const response = await Axios({
    method: "GET",
    url,
    responseType: "stream"
  });
  console.log(`Download for episode ${episodeNumber} has started`);
  const path = Path.resolve(
    __dirname,
    "../",
    "media",
    `episode-${episodeNumber}.mp4`
  );
  response.data.pipe(fs.createWriteStream(path));
  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      console.log(`Download for episode ${episodeNumber} has been completed`);
      resolve();
    });
    response.data.on("error", (err: Error) => reject(err));
  });
};

export default downloadEpisode;
