import assert from "node:assert";
import test from "node:test";
import { getMostListenedSongByCount } from "./analysis.mjs";

// Test for Most listened song by count
test("Most listened song by count - basic case", () => {
  const testListens = [
    { timestamp: "2024-08-01T00:20:07", song_id: "song-1" },
    { timestamp: "2024-08-01T02:00:31", song_id: "song-1" },
    { timestamp: "2024-08-01T03:52:51", song_id: "song-2" },
  ];
  
  const result = getMostListenedSongByCount(testListens);
  assert.equal(result.id, "song-1");
});

test("Most listened song by count - empty array", () => {
  const result = getMostListenedSongByCount([]);
  assert.equal(result, null);
});