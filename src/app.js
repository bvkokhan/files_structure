const fs = require('node:fs');
const path = require('node:path');

function renderHomePage() {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  return fs.readFileSync(filePath, 'utf-8');
}

function requestHandler(req, res) {
  if (req.url === '/' && req.method === 'GET') {
    const html = renderHomePage();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(html);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=UTF-8' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}

module.exports = {
  requestHandler,
};
