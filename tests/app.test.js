const test = require('node:test');
const assert = require('node:assert/strict');
const { requestHandler } = require('../src/app');

function createMockResponse() {
  return {
    statusCode: null,
    headers: null,
    body: '',
    writeHead(status, headers) {
      this.statusCode = status;
      this.headers = headers;
    },
    end(payload) {
      this.body = payload;
    },
  };
}

test('returns 404 for unknown route', () => {
  const req = { url: '/unknown', method: 'GET' };
  const res = createMockResponse();

  requestHandler(req, res);

  assert.equal(res.statusCode, 404);
  assert.match(res.body, /Not Found/);
});
