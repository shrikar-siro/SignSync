import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [count, setCount] = useState(0);
  const [artist, setArtist] = useState("");

  async function handleSearch() {
    //add code here for handling search.
  }

  return (
    <>
      <div className="app w-75 mx-auto row justify-content-center">
        <p className="h1 p-1">SongSync</p>
      </div>
      <div className="container-fluid">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for Artist..."
            onChange={(e) => setArtist(e.target.value)}
          ></input>
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
