import { getSong } from "./data.mjs";

// --- Helper functions ---

// Helper function to check if a timestamp is Friday night 5pm to 4am
function isFridayNight(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDay(); // 0 = Sunday, 5 = Friday
  const hour = date.getHours();

  // Friday 5pm to 11:59pm OR Saturday 12am to 3:59am
  return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
}

// Helper function to get unique days from listens
function getUniqueDays(listens) {
  const dates = listens.map((listen) =>
    new Date(listen.timestamp).toDateString()
  );
  return [...new Set(dates)];
}

// --- Core functionality ---

// Most listened
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

// Most listened on a Friday night
/**
 * Gets the most listened song by count or time on a Friday night
 * @param {Array} listens - Array of listen event objects
 * @param {string} [metric="count"] - Metric to use: "count" or "time"
 * @returns {Object|null} Song object or null if no Friday night listens
 */
export function getFridayNightSong(listens, metric = "count") {
  const fridayListens = listens.filter((listen) =>
    isFridayNight(listen.timestamp)
  );
  if (fridayListens.length === 0) return null;

  return getMostListened(fridayListens, "song", metric);
}

// Longest streak
export function getLongestStreak(listens) {
  if (listens.length === 0) return null;

  const streaks = [];
  let currentStreak = { songId: listens[0].song_id, count: 1 };

  listens.forEach((listen) => {
    if (listen.song_id === currentStreak.songId) {
      currentStreak.count++;
    } else {
      streaks.push(currentStreak);
      currentStreak = { songId: listen.song_id, count: 1 };
    }
  });
  streaks.push(currentStreak);

  const maxStreak = Math.max(...streaks.map((s) => s.count));
  const longestStreaks = streaks.filter((s) => s.count === maxStreak);

  return longestStreaks.map((streak) => ({
    song: getSong(streak.songId),
    count: streak.count,
  }));
}

// Everyday songs
export function getEverydaySongs(listens) {
  const days = getUniqueDays(listens);
  if (days.length === 0) return null;

  const songsByDay = {};
  days.forEach((day) => {
    songsByDay[day] = new Set();
  });

  listens.forEach((listen) => {
    const day = new Date(listen.timestamp).toDateString();
    songsByDay[day].add(listen.song_id);
  });

  const everydaySongs = [];
  const allSongs = new Set(listens.map((listen) => listen.song_id));

  allSongs.forEach((songId) => {
    const isEveryday = days.every((day) => songsByDay[day].has(songId));
    if (isEveryday) {
      everydaySongs.push(getSong(songId));
    }
  });

  return everydaySongs.length > 0 ? everydaySongs : null;
}

// Top three genres
export function getTopGenres(listens) {
  if (listens.length === 0) return null;

  const genreCounts = {};
  listens.forEach((listen) => {
    const song = getSong(listen.song_id);
    genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
  });

  const sortedTopGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])
    .slice(0, 3);

  return sortedTopGenres;
}
