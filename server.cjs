

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const {getLyrics} = require('genius-lyrics-api');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow requests from frontend
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "app/dist")));




const GENIUS_API_KEY = process.env.VITE_GENIUS_API_TOKEN;
app.get("/");

// get the lyrics
app.get("api/lyrics/:title", async(req, res) =>{
    const songTitle = req.params.title;

    const options = {
        title:songTitle,
        artist: " ",
        apiKey: GENIUS_API_KEY,
        optimizeQuery: true,
    };

    //try to get the lyrics from the backend this time: 
    try {
        const lyrics = getLyrics(options);
        if (!lyrics) {
          return res.status(404).json({message:"lyrics not found!"});
        } else {
            console.log(lyrics)
          res.json(lyrics);
        }
      } catch (error) {
        //send result error back.
        res.status(500).json({message: "Error when fetching data!"});
    }
});

// Handle React frontend routing (fixes "Cannot GET /" issue)
// continue listening even if lyric getting fails.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "app/dist", "index.html"));
  });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
