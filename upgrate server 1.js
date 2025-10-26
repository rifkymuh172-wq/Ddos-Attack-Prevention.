// protected-server.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();

// Tambahkan keamanan dasar dengan Helmet
app.use(helmet());

// Middleware untuk membatasi jumlah request per IP
const limiter = rateLimit({
  windowMs: 1000, // 1 detik
  max: 5,         // maksimal 5 request per detik per IP
  message: { error: "Terlalu banyak permintaan, coba lagi nanti." }
});
app.use(limiter);

// Parsing JSON
app.use(express.json());

// Endpoint utama
app.get('/', (req, res) => {
  res.send('Halo, ini server terlindungi dari serangan.');
});

// Endpoint status
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});


app.get('/work', (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 50) {} // simulasi kerja CPU 50ms
  res.json({ result: 'done', took_ms: Date.now() - start });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Protected server berjalan di http://localhost:${PORT}`));
