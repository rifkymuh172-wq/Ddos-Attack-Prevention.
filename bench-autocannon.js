const autocannon = require('autocannon');

const opts = {
  url: 'http://localhost:3000/work',
  connections: 100,  // jumlah koneksi paralel lebih besar
  duration: 10,      // lama pengujian dalam detik
};

console.log('Menjalankan Autocannon...');
autocannon(opts, (err, result) => {
  if (err) throw err;
  console.log(`Requests/sec: ${result.requests.average}`);
  console.log(`Latency p50: ${result.latency.p50} ms`);
});