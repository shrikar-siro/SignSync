import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { searchSong } from "genius-lyrics-api"; // Import Genius API methods
import { Link } from "react-router-dom";

export let exportableSongTitle = "";
function App() {
  //specifying it like this because the data returned from the API is in this format, and I want to pass it into this variable.
  const [songChoices, setSongChoices] = useState<
    { id: number; title: string; url: string; albumArt: string }[]
  >([]);
  const [songTitle, setSongTitle] = useState(""); // Store song title
  const [loading, setLoading] = useState(false); // Show loading state

  const accessToken = import.meta.env.VITE_GENIUS_API_TOKEN; // Genius API Key

  async function songSearch() {
    // setLoading(true);
    // setLyrics(""); // Reset lyrics
    // setSongTitle("");

    const options = {
      title: songTitle, // Empty to fetch any song from the artist
      artist: " ",
      apiKey: accessToken,
      optimizeQuery: true,
    };

    try {
      // 🔹 Step 1: Search for the songs.
      exportableSongTitle = songTitle;
      console.log(exportableSongTitle);
      const searchResults = await searchSong(options);
      if (!searchResults) {
        setLoading(false);
        return;
      } else {
        setSongChoices(searchResults);
        console.log(searchResults);
      }

      // // 🔹 Step 2: Pick the first song from results
      // const firstSong = searchResults[0];
      // setSongTitle(firstSong.title);
      // console.log("Fetching lyrics for:", firstSong.title);

      // // 🔹 Step 3: Fetch lyrics using the found song
      // const lyricsData = await getLyrics({
      //   apiKey: accessToken,
      //   title: firstSong.title,
      //   artist: artist,
      //   optimizeQuery: true,
      // });

      // setLyrics(lyricsData || "Lyrics not found.");
    } catch (error) {
      console.error("Error fetching lyrics:", error);
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
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={songSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* {songTitle && <h3 className="mt-4">Song: {songTitle}</h3>}
      {lyrics && (
        <div className="mt-2">
          <p className="h3">Lyrics: </p>
          <pre style={{ whiteSpace: "pre-wrap" }}>{lyrics}</pre>
        </div>
      )} */}
      <div className="container-fluid justify-content-center mt-3">
        <div className="mx-auto">
          {songChoices.map((song) => {
            return (
              <Link to={`/tracks/${songTitle}`} key={song.id} className="link">
                <div
                  className="card mb-3 border border-3 border-grey"
                  key={song.id}
                >
                  <div className="row g-0">
                    <div className="col-md-4 p-0">
                      <img
                        src={song.albumArt}
                        className="img-fluid rounded-start card-image m-0"
                        alt={song.title}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body d-flex align-items-center justify-content-center text-center">
                        <p className="card-title m-0">{song.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
