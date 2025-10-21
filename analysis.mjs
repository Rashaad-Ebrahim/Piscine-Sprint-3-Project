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

const listens = getListenEvents(4);
const mostListened = getMostListenedSongByCount(listens);
console.log(mostListened);

// 2. Most listened song by time
// 3. Most listened artist by count
// 4. Most listened artist by time
// 5. Friday night song by count
// 6. Friday night song by time
// 7. Longest streak
