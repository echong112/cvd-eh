import { getSingleVideoById } from './fl';

export const addToPlaylist = async (video) => {
  const playlist = await getPlaylist();
  let isUnique = playlist.indexOf(video.id) === -1;
  if (isUnique) {
    playlist.push(video.id);
    localStorage.setItem('cvd-playlist', playlist);
  }
  return playlist;
};

export const addToPlaylistWithId = async (id) => {
  const playlist = await getPlaylist();
  let isUnique = playlist.indexOf(id) === -1;
  if (isUnique) {
    playlist.push(id);
    localStorage.setItem('cvd-playlist', playlist);
  }
  return playlist;
};
export const removeFromPlaylist = async (videoId) => {
  const playlist = await getPlaylist();
  playlist.forEach((item, index) => {
    if (item === videoId) {
      playlist.splice(index, 1);
    }
  });
  localStorage.setItem('cvd-playlist', playlist);
  return playlist;
};
//
export const getPlaylist = async () => {
  const cvdPlaylist = localStorage.getItem('cvd-playlist');
  const playlist = [];
  if (cvdPlaylist) {
    cvdPlaylist.split(',').forEach((item) => {
      playlist.push(item);
    });
  }
  return playlist;
};

export const getVideosFromPlaylist = async (playlist = []) => {
  const videos = [];
  for (const item of playlist) {
    const res = await getSingleVideoById(item);
    videos.push(res);
  }
  return videos;
};
