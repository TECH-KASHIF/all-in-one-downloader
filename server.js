const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('<h1>All-in-One Downloader Server Running Successfully!</h1>');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
