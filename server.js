const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files (public folder)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.post('/download/instagram', async (req, res) => {
    const { url } = req.body;
    // Yahan tumhara Instagram download logic aayega
    res.json({ url: url, message: "Instagram download success!" });
});

app.post('/download/facebook', async (req, res) => {
    const { url } = req.body;
    // Yahan tumhara Facebook download logic aayega
    res.json({ url: url, message: "Facebook download success!" });
});

// Default Route - frontend serve
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
