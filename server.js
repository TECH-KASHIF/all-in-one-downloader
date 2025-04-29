const axios = require('axios');
const cheerio = require('cheerio');

// TikTok Downloader Route
app.get('/api/tiktok', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: 'URL required' });
  }

  try {
    const response = await axios.get(`https://ssstik.io/en`, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(response.data);
    // Note: Actual TikTok downloaders often require form submission.
    // For real production, you need a paid API or a server in between.

    // This is a placeholder response
    return res.json({
      status: 'success',
      message: 'TikTok video downloader connected (placeholder)',
      input: videoUrl
    });

  } catch (error) {
    console.error('TikTok error:', error);
    res.status(500).json({ error: 'Failed to fetch TikTok video' });
  }
});
