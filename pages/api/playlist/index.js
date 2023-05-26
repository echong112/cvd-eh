import { playlist } from './playlistData.js';
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(playlist);
  } else if (req.method === 'POST') {
    const video = req.body.video;
    playlist.push(video);
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem('playlist', playlistArr);
    //   console.log('localStorage', localStorage.getItem('playlist'));
    // }

    res.status(201).json(video);
  }
}
