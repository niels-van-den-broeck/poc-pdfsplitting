const request = require('supertest');
const app = require('../../jest-server');

describe('GET /api/book/page/:number', () => {
  function act() {
    return request(app)
      .get('/api/book/page/:number');
  }

  it('it succeeds', async () => {
    await act().expect(200);
  });
});
