const request = require('supertest');
const app = require('../../jest-server');

describe('GET /api/company/:id', () => {
    function act() {
        return request(app)
            .get('/api/company/1');
    }

    it('it succeeds', async () => {
        await act().expect(200);
    });
});