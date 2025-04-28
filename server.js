const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Instagram Downloader API
app.post("/download/instagram", async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const videoUrl = $('meta[property="og:video"]').attr('content');
    const imageUrl = $('meta[property="og:image"]').attr('content');

    if (videoUrl) {
      res.json({ type: "video", url: videoUrl });
    } else if (imageUrl) {
      res.json({ type: "image", url: imageUrl });
    } else {
      res.status(404).json({ message: "Media not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Facebook Downloader API
app.post("/download/facebook", async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const videoUrl = $('meta[property="og:video"]').attr('content');

    if (videoUrl) {
      res.json({ type: "video", url: videoUrl });
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("All-in-One Downloader Server Running Successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
