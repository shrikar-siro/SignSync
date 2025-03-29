import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [artist, setArtist] = useState("");

  //keeping credentials here - we can move them into ENV later.
  const accessToken = import.meta.env.VITE_GENIUS_API_TOKEN;
  // console.log(import.meta.env);
  // console.log(accessToken);

  async function artistSearch() {
    //add code here for handling search.
    //Search URL:
    const URL = "https://api.genius.com/search";

    try {
      const response = await fetch(`${URL}?q=${encodeURIComponent(artist)}`, {
        method: "GET",
        mode: "no-cors",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      //print data to find out what to access.
      const dataAsText = await response.text();
      if (!dataAsText) {
        console.log("No data in the response!");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error in retreiving data. Error is: ", error);
    }
  }

  return (
    <>
      <div className="app w-75 mx-auto row justify-content-center">
        <p className="h1 p-1 mb-3">SongSync</p>
      </div>
      <div className="container-fluid">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for Artist..."
            onChange={(e) => setArtist(e.target.value)}
          ></input>
          <button className="btn btn-primary" onClick={artistSearch}>
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
