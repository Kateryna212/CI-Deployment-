const http = require('http');

// 1. Determine the port based on the hierarchy of requirements
// Priority: process.env.PORT > process.argv[2] > fallback (3000)
const PORT = process.env.PORT || process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  // 2. Handle GET /
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
    res.writeHead(404);
    res.end();
  }
});

// 3. Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
