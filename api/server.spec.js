const server = require('./server.js');
const request = require('supertest');
const db = require('../database/db-config.js');

const testuserData = {
    email: 'helloworld@email.com',
    password: 'h3ll0w0rld',
    first_name: 'Hilo',
    last_name: 'Wurl',
    shop_name: 'Hello World Shop',
    location_id: 4,
}

describe('server',  () => {

    describe('environment', () => {
        test('should be testing env', () => {
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

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

    describe('POST /api/auth/register/owner', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })

        test('user can register and get 201 status with valid info submission', async () => {
            const response = await request(server)
                .post('/api/auth/register/owner')
                .send({...testuserData})
            expect(response.status).toBe(201)
        })

        test('user cannot register with invalid info submission and gets 400 status', async () => {
            const response = await request(server)
            .post('/api/auth/register/owner')
            .send({...testuserData, email:''})
        expect(response.status).toBe(401)
        })
    })
    
    describe.skip('GET /api/auth/users' , () => {
        
        beforeEach( async () => {
            await db('users').truncate();
            await request(server)
                    .post('/api/auth/register/owner')
                    .send({...testuserData});
            const login = await request(server)
                    .post('/api/login')
                    .send({
                        email: testuserData.username, password: testuserData.password
                    })
        })

        test('requires valid token to proceed', async() => {
            const response = await request(server).get('/api/auth/users');
            expect(response.status).toEqual(401);
        });

        test.skip('it returns an array', async () => {
            const response = await request(server).get('/api/auth/users');
            expect(Array.isArray(response.body)).toBeTruthy();
        })
        test.skip('returns 200 status', async () => {
            const expected = 200;
            const response = await request(server).get('/api/auth/users');
            expect(response.status).toEqual(expected);       
        })
    })
})


