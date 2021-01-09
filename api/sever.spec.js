const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    describe('GET /' , () => {
        test('it returns {api: up}', async () => {
            const expected = {api: 'up'};
            const response = await request(server).get('/');
            expect(response.body).toEqual(expected);
        })
        test('returns json object', async () => {
            const response = await request(server).get('/');
            expect(response.type).toEqual('application/json');       
        })
    })
})