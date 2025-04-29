const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------- TikTok API ----------
app.get('/api/tiktok', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'TikTok URL required' });

  try {
    const apiRes = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`);
    if (apiRes.data?.data?.play) {
      res.json({
        platform: 'tiktok',
        no_watermark: apiRes.data.data.play,
        watermark: apiRes.data.data.wmplay,
        thumbnail: apiRes.data.data.cover
      });
    } else {
      res.status(500).json({ error: 'TikTok fetch failed' });
    }
  } catch {
    res.status(500).json({ error: 'TikTok server error' });
  }
});

// ---------- Facebook API ----------
app.get('/api/facebook', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Facebook URL required' });

  try {
    const apiRes = await axios.get(`https://facebookvideodownloader.online/api/video?url=${encodeURIComponent(videoUrl)}`);
    if (apiRes.data?.links) {
      res.json({
        platform: 'facebook',
        hd: apiRes.data.links.HD,
        sd: apiRes.data.links.SD
      });
    } else {
      res.status(500).json({ error: 'Facebook fetch failed' });
    }
  } catch {
    res.status(500).json({ error: 'Facebook server error' });
  }
});

// ---------- Instagram API ----------
app.get('/api/instagram', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Instagram URL required' });

  try {
    const apiRes = await axios.get(`https://instagram-media-downloader.p.rapidapi.com/rapid/post.php?url=${encodeURIComponent(videoUrl)}`, {
      headers: {
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // replace this
        'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com'
      }
    });

    if (apiRes.data?.media) {
      res.json({
        platform: 'instagram',
        media: apiRes.data.media
      });
    } else {
      res.status(500).json({ error: 'Instagram fetch failed' });
    }
  } catch {
    res.status(500).json({ error: 'Instagram server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
