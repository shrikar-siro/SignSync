require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors()); // Allow requests from frontend
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "app/dist")));

// Handle React frontend routing (fixes "Cannot GET /" issue)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "app/dist", "index.html"));
});


const GENIUS_API_KEY = process.env.VITE_GENIUS_API_TOKEN;
app.get("/")
app.get("/lyrics", async (req, res) => {
    const { title, artist } = req.query;

    try {
        const response = await axios.get("https://api.genius.com/search", {
            headers: { Authorization: `Bearer ${GENIUS_API_KEY}` },
            params: { q: `${title} ${artist}` },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        res.status(500).json({ error: "Failed to fetch lyrics" });
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
