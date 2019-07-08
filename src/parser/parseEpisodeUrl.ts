import { EpisodeInfo } from "./parseEpisodesListPage";

type ParseEpisodeUrl = (url: string | null) => EpisodeInfo | null;

const parseEpisodeUrl: ParseEpisodeUrl = url => {
  if (url === null) {
    return null;
  }
  const regExp = /Episode-(\d*)/;
  const match = url.match(regExp);
  if (match === null) {
    return null;
  }
  return {
    url: "https://kissanime.ru" + url + "&s=rapidvideo",
    episodeNumber: parseInt(match[1], 10)
  };
};

export default parseEpisodeUrl;
