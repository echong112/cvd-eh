export const emailPlaylist = (playlistVideos, playListMap) => {
  const subject = encodeURIComponent('Courageous Video Directory Playlist');
  const body = encodeURIComponent(playlistToString(playlistVideos, playListMap));
  const link = `mailto:?subject=${subject}&body=${body}`;
  window.open(link);
};

export const playlistToString = (playlistVideos, playlistMap) => {
  const stringToReturn = '';
  playlistVideos.forEach((item, i) => {
    const url = `${window.location.origin}/${item.vimeo ? 'video' : 'article'}/${playlistMap[i]}`;
    let textTags = '';
    console.log(item);
    if (item.tags.length > 0) {
      textTags = item.tags.reduce((initial, tag) => {
        return `${initial}, ${tag}`;
      });
    }
    stringToReturn += `
  Title: ${item.title}
  Brand: ${item.brand.title}
  Description: ${item.description ? item.description : ''}
  Tags: ${textTags ? textTags : ''}
  URL: ${url}
  `;
  });
  return stringToReturn;
};
