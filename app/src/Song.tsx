import "bootstrap/dist/css/bootstrap.min.css";
// import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { exportableSongTitle } from "./App";

function Song() {
  const { id } = useParams();
  console.log(exportableSongTitle);

  //get lyrics by getting a response back from the backend.
  //do this each time id changes.
  useEffect(() => {
    const receiveLyrics = async () => {
      //try to access the resource.
      try {
        const response = await fetch(`api/lyrics/${id}`);
        if (!response.ok) {
          console.log("Error fetching response.");
        }
        //otherwise, get the data from the response.
        const data = response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      receiveLyrics();
    }
  }, [id]);
  return (
    <>
      <div className="container-fluid text-center">
        <p className="h4">Song id = {id}</p>
      </div>
    </>
  );
}

export default Song;
