import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getLyrics, searchSong } from "genius-lyrics-api"; // Import Genius API methods

function App() {
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState(""); // Store lyrics
  const [songTitle, setSongTitle] = useState(""); // Store song title
  const [loading, setLoading] = useState(false); // Show loading state

  const accessToken = import.meta.env.VITE_GENIUS_API_TOKEN; // Genius API Key

  async function artistSearch() {
    if (!artist) {
      console.log("Please enter an artist name!");
      return;
    }

    setLoading(true);
    setLyrics(""); // Reset lyrics
    setSongTitle("");

    const options = {
      apiKey: accessToken,
      artist: artist,
      title: "", // Empty to fetch any song from the artist
      optimizeQuery: true,
    };

    try {
      // 🔹 Step 1: Search for songs by the artist
      const searchResults = await searchSong(options);
      if (!searchResults || searchResults.length === 0) {
        setLyrics("No songs found for this artist.");
        setLoading(false);
        return;
      }

      // 🔹 Step 2: Pick the first song from results
      const firstSong = searchResults[0];
      setSongTitle(firstSong.title);
      console.log("Fetching lyrics for:", firstSong.title);

      // 🔹 Step 3: Fetch lyrics using the found song
      const lyricsData = await getLyrics({
        apiKey: accessToken,
        title: firstSong.title,
        artist: artist,
        optimizeQuery: true,
      });

      setLyrics(lyricsData || "Lyrics not found.");
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setLyrics("Error retrieving lyrics.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="app w-75 mx-auto row justify-content-center">
        <p className="h1 p-1 mb-3">SongSync</p>
      </div>
      <div className="container-fluid">
        <div className="input-group mb-2">
          <input
            className="form-control"
            type="text"
            placeholder="Search for Artist..."
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={artistSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {songTitle && <h3 className="mt-4">Song: {songTitle}</h3>}
      {lyrics && (
        <div className="mt-2">
          <h3>Lyrics:</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{lyrics}</pre>
        </div>
      )}
    </>
  );
}

export default App;
