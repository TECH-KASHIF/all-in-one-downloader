const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/download", async (req, res) => {
  const { platform, url } = req.query;

  try {
    if (platform === "tiktok") {
      const { data } = await axios.get(url);
      const videoUrl = data.match(/"downloadAddr":"(.*?)"/)[1].replace(/\\u002F/g, "/").replace(/\\u0026/g, "&");
      return res.json({ success: true, download: videoUrl });
    }

    if (platform === "facebook" || platform === "instagram") {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const videoUrl = $("meta[property='og:video']").attr("content") || $("meta[property='og:video:url']").attr("content");
      return res.json({ success: true, download: videoUrl });
    }

    return res.json({ success: false, message: "Unsupported platform" });
  } catch (err) {
    return res.json({ success: false, message: "Download error", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
}); const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/download", async (req, res) => {
  const { platform, url } = req.query;

  try {
    if (platform === "tiktok") {
      const { data } = await axios.get(url);
      const videoUrl = data.match(/"downloadAddr":"(.*?)"/)[1].replace(/\\u002F/g, "/").replace(/\\u0026/g, "&");
      return res.json({ success: true, download: videoUrl });
    }

    if (platform === "facebook" || platform === "instagram") {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const videoUrl = $("meta[property='og:video']").attr("content") || $("meta[property='og:video:url']").attr("content");
      return res.json({ success: true, download: videoUrl });
    }

    return res.json({ success: false, message: "Unsupported platform" });
  } catch (err) {
    return res.json({ success: false, message: "Download error", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
