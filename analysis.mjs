import { getSong, getListenEvents } from "./data.mjs";

// Helper
function isFridayNight(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDay(); // 0 = Sunday, 5 = Friday
  const hour = date.getHours();

  // Friday 5pm (17) to 11:59pm (23) OR Saturday 12am (0) to 4am (4)
  return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
}

/**
 * Gets the most listened item (song or artist) by count or time
 * @param {Array} listens - Array of listen event objects
 * @param {string} type - Type of item to analyze: "song" or "artist"
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

/**
 * Gets the most listened item (song or artist) by count or time
 * @param {Array} listens - Array of listen event objects
 * @param {string} [metric="count"] - Metric to use: "count" or "time"
 * @returns {Object|string|null} Song object or null if no listens
 */

export function getFridayNightSong(listens, metric) {
  const fridayListens = listens.filter((listen) =>
    isFridayNight(listen.timestamp)
  );
  if (fridayListens.length === 0) return null;

  return getMostListened(fridayListens, "song", metric);
}

// 7. Longest streak
export function getLongestStreak(listens) {
  if (listens.length === 0) return null;
}

const listens = getListenEvents(4);
// console.log(getMostListened(listens, "song", "count"));
console.log(getFridayNightSongByCount(listens, "count"));
