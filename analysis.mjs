import { getSong, getListenEvents } from "./data.mjs";

// 1. Most listened song by count
export function getMostListenedSongByCount(listens) {
  //handle edge case
  if (listens.length === 0) return null;

  // get listen counts
  const songCounts = {};
  listens.forEach((listen) => {
    songCounts[listen.song_id] = (songCounts[listen.song_id] || 0) + 1;
  });

  // find most listened count
  const maxCount = Math.max(...Object.values(songCounts));

  // get most listened song title
  const topSongId = Object.keys(songCounts).find(
    (id) => songCounts[id] === maxCount
  );

  return getSong(topSongId);
}

// 2. Most listened song by time
export function getMostListenedSongByTime(listens) {
  if (listens.length === 0) return null;

  const songTimes = {};
  listens.forEach((listen) => {
    const song = getSong(listen.song_id);
    songTimes[listen.song_id] =
      (songTimes[listen.song_id] || 0) + song.duration_seconds;
  });
  console.log(songTimes);

  const maxTime = Math.max(...Object.values(songTimes));
  const topSongId = Object.keys(songTimes).find(
    (id) => songTimes[id] === maxTime
  );

  return getSong(topSongId);
}

// 3. Most listened artist by count
export function getMostListenedArtistByCount(listens) {
    if (listens.length === 0) return null;
    
    const artistCounts = {};
    listens.forEach(listen => {
        const song = getSong(listen.song_id);
        artistCounts[song.artist] = (artistCounts[song.artist] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(artistCounts));
    return Object.keys(artistCounts).find(artist => artistCounts[artist] === maxCount);
}


// 4. Most listened artist by time
export function getMostListenedArtistByTime(listens) {
    if (listens.length === 0) return null;
    
    const artistTimes = {};
    listens.forEach(listen => {
        const song = getSong(listen.song_id);
        artistTimes[song.artist] = (artistTimes[song.artist] || 0) + song.duration_seconds;
    });
    
    const maxTime = Math.max(...Object.values(artistTimes));
    return Object.keys(artistTimes).find(artist => artistTimes[artist] === maxTime);
}


// 5. Friday night song by count
// 6. Friday night song by time
// 7. Longest streak

const listens = getListenEvents(1);
const mostListened = getMostListenedSongByTime(listens);
console.log(mostListened);
