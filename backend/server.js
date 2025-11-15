const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Example POST endpoint
app.post('/api/echo', (req, res) => {
  res.json({ youSent: req.body });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
