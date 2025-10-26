// unprotected-server.js
const express = require('express');
const app = express();

app.use(express.json());

// Endpoint utama (tanpa pesan proteksi)
app.get('/', (req, res) => {
  res.send('Halo — server TANPA proteksi (uji lokal saja).');
});

// Endpoint status
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/error', (req, res) => {
  // sengaja memicu error
  throw new Error('Ini error sengaja untuk pengujian!');
});

app.get('/crash', (req, res) => {
  res.send('Server akan segera berhenti (crash) — untuk uji lokal.');
  setTimeout(() => process.exit(1), 100);
});

app.get('/heavy', (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 3000) {}
  res.json({ result: 'heavy-done', took_ms: Date.now() - start });
});

app.use((err, req, res, next) => {
  console.error('Terjadi error (handled):', err);
  res.status(500).json({ error: 'Internal Server Error (handled)', message: String(err.message) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Unprotected server berjalan di http://localhost:${PORT}`));
