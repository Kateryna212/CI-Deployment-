const http = require('http');

const PORT = process.env.PORT || process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  // 1. Додаємо обов'язкові безпекові заголовки та CORS для кожного запиту
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // 2. Обробка CORS Preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }

    const { method, url } = req;

    // 3. Роут /health
    if (method === 'GET' && url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: true }));
    }

    // 4. Роут /boom (імітація помилки)
    if (method === 'GET' && url === '/boom') {
      throw new Error('Something went wrong');
    }

    // 404 для всього іншого
    res.writeHead(404);
    res.end('Not Found');

  } catch (err) {
    // 5. Обробка помилок без падіння сервера
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Production-ready server on port ${PORT}`);
});
