import assert from "node:assert";
import test from "node:test";
import { getMostListened } from "./analysis.mjs";

// Mock the getSong function used by getMostListened
function getSong(songID) {
  const songs = [
    {
      id: "song-1",
      artist: "The King Blues",
      title: "I Got Love",
      duration_seconds: 190,
      genre: "Punk",
    },
    {
      id: "song-2",
      artist: "Frank Turner",
      title: "Be More Kind",
      duration_seconds: 247,
      genre: "Pop",
    },
    {
      id: "song-3",
      artist: "Frank Turner",
      title: "The Ballad of Me and My Friends",
      duration_seconds: 153,
      genre: "Folk",
    },
    {
      id: "song-4",
      artist: "Frank Turner",
      title: "Photosynthesis",
      duration_seconds: 254,
      genre: "Pop",
    },
    {
      id: "song-5",
      artist: "Frank Turner",
      title: "I Still Believe",
      duration_seconds: 227,
      genre: "Pop",
    },
    {
      id: "song-6",
      artist: "Public Service Broadcasting",
      title: "Go!",
      duration_seconds: 253,
      genre: "Alternative",
    },
    {
      id: "song-7",
      artist: "Faithless",
      title: "Insomnia",
      duration_seconds: 518,
      genre: "House",
    },
    {
      id: "song-8",
      artist: "The Swell Season",
      title: "When Your Mind's Made Up",
      duration_seconds: 221,
      genre: "Folk",
    },
    {
      id: "song-9",
      artist: "The Divine Comedy",
      title: "Tonight We Fly",
      duration_seconds: 181,
      genre: "Pop",
    },
    {
      id: "song-10",
      artist: "Ani DiFranco",
      title: "As Is",
      duration_seconds: 246,
      genre: "Pop",
    },
  ];
  return songs.find((song) => song.id === songID);
}

test("getMostListened - should return most listened artist with correct count", () => {
  const listeningData = [
    { songId: "song-2", timestamp: "2023-01-01T10:00:00Z" },
    { songId: "song-2", timestamp: "2023-01-02T11:00:00Z" },
    { songId: "song-4", timestamp: "2023-01-03T12:00:00Z" },
    { songId: "song-5", timestamp: "2023-01-04T13:00:00Z" },
    { songId: "song-1", timestamp: "2023-01-05T14:00:00Z" },
  ];

  const result = getMostListened(listeningData, getSong);
  
  assert.deepStrictEqual(result, {
    artist: "Frank Turner",
    count: 3
  });
});

