const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Homepage
app.get('/', (req, res) => {
  res.send('All-in-One Downloader Server Running!');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
