const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : decodeURIComponent(req.url);
  const fp = path.join(DIR, file);
  if (!fs.existsSync(fp)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = path.extname(fp).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(fp).pipe(res);
}).listen(PORT, '0.0.0.0', () => console.log(`YGP site live on http://0.0.0.0:${PORT}`));
