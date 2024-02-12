// Create web server
// Run: node comments.js
// Test: http://localhost:8000

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const { url, method } = req;
  switch (url) {
    case '/':
      fs.createReadStream('./index.html').pipe(res);
      break;
    case '/comments':
      if (method === 'POST') {
        req.pipe(fs.createWriteStream('./comments.txt'));
      } else {
        fs.createReadStream('./comments.txt').pipe(res);
      }
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found');
  }
}).listen(8000, () => {
  console.log('Server running at http://localhost:8000/');
});