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

describe('Auth Router', () => {
    describe('GET /users' , () => {
        test('it returns an array', async () => {
            const response = await request(server).get('/api/auth/users');
            expect(Array.isArray(response.body)).toBeTruthy();
        })
        test('returns 200 status', async () => {
            const expected = 200;
            const response = await request(server).get('/api/auth/users');
            expect(response.status).toEqual(expected);       
        })
    })
})
