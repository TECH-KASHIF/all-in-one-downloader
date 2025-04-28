const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.post('/download/instagram', async (req, res) => {
    // Tumhara Instagram API logic
});

app.post('/download/facebook', async (req, res) => {
    // Tumhara Facebook API logic
});

// Default route -> serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
