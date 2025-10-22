import { getSong, getListenEvents } from "./data.mjs";

/**
 * Gets the most listened item (song or artist) by count or time
 * @param {Array} listens - Array of listen event objects
 * @param {string} [type="song"]- Type of item to analyze: "song" or "artist"
 * @param {string} [metric="count"] - Metric to use: "count" or "time"
 * @returns {Object|string|null} Song object, artist name, or null if no listens
 */

export function getMostListened(listens, type, metric = "count") {
  if (listens.length === 0) return null;

  const counts = {};

  listens.forEach((listen) => {
    const song = getSong(listen.song_id);
    const key = type === "artist" ? song.artist : listen.song_id;
    const value = metric === "time" ? song.duration_seconds : 1;

    counts[key] = (counts[key] || 0) + value;
  });

  const maxValue = Math.max(...Object.values(counts));
  const topKey = Object.keys(counts).find((key) => counts[key] === maxValue);

  return type === "song" ? getSong(topKey) : topKey;
}


// 5. Friday night song by count
// 6. Friday night song by time
// 7. Longest streak

