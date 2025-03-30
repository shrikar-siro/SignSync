import "bootstrap/dist/css/bootstrap.min.css";
import { getLyrics } from "genius-lyrics-api";
// import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { exportableSongTitle } from "./App";

function Song() {
  const { id } = useParams();
  const accessToken = import.meta.env.VITE_GENIUS_API_TOKEN; // Genius API Key
  console.log(exportableSongTitle);
  // get lyrics using song id parameter.
  const options = {
    title: id ? id : "Hello",
    artist: " ",
    apiKey: accessToken,
    optimizeQuery: true,
  };

  //get the lyrics using try - if not, then print out error.
  try {
    const lyrics = getLyrics(options);
    if (!lyrics) {
      console.log("No Lyrics Found");
      return (
        <>
          <div className="alert alert-secondary" role="alert">
            No lyrics were found for your artist!
          </div>
        </>
      );
    } else {
      console.log(lyrics);
    }
  } catch (error) {
    console.log("Error is: ", error);
  }

  return (
    <>
      <div className="container-fluid text-center">
        <p className="h4">Song id = {id}</p>
      </div>
    </>
  );
}

export default Song;
