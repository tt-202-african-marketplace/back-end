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

const testProductData = {
    item_name: 'odd fruit', 
    category_id: 8, 
    price: 10.50,
    description: 'odd but sweet'
}

describe('environment', () => {
        test('should be testing env', () => {
            expect(process.env.DB_ENV).toBe('testing')
        })
})

describe('server',  () => {

    beforeEach( async () => {
        await db('products').truncate();
        await db('users').truncate();
    })

    describe('GET /' , () => {
        test('it returns {api: up}', async () => {
            const expected = {api: 'up'};
            const response = await request(server).get('/');
            expect(response.body).toEqual(expected);
            expect(response.type).toEqual('application/json');       
        })
    })

    describe('POST /api/auth/register/owner', () => {

        test('user can register and get 201 status with valid info submission', async () => {
            const response = await request(server)
                .post('/api/auth/register/owner')
                .send({...testuserData})
            expect(response.status).toBe(201)
        })

        test('user cannot register with invalid info submission and gets 400 status', async () => {
            const response = await request(server)
            .post('/api/auth/register/owner')
            .send({...testuserData, email:''});

            expect(response.status).toBe(401);
        })
    })

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(server)
                .post('/api/auth/register/owner')
                .send({...testuserData})
        })

        const {email, password} = testuserData;

        test('user cannot login with invalid cred and get 401 status', async () => {
            const response = await request(server)
            .post('/api/auth/login')
            .send({email, password:'badpass'});

            expect(response.status).toBe(401);
        })

        test('successful login responds 201 status and returns with token', async () => {
            const response = await request(server)
            .post('/api/auth/login')
            .send({email, password});
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        })
    }) 
    
    describe('GET /api/auth/users' , () => {
        const {email, password} = testuserData;
        
        beforeEach( async () => {
            await request(server)
                    .post('/api/auth/register/owner')
                    .send({...testuserData});
        })

        test('requires valid token to proceed', async() => {
            const response = await request(server).get('/api/auth/users');
            expect(response.status).toEqual(401);
        });
        
        test('returns 200 status and array', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send({email, password});
            const {token} = login.body

            const response = await request(server)
                .get('/api/auth/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);       
            expect(Array.isArray(response.body)).toBeTruthy();
        })
        
    })

    describe('POST /api/auth/add-product', () => {
        const {email, password} = testuserData;
       /*  const {item_name, category_id, price, description} = testProductData; */

        beforeEach( async () => {
            await request(server)
                    .post('/api/auth/register/owner')
                    .send({...testuserData});
        })

        test('recieve 401 status if user is not logged in', async () => {
            const response = await request(server)
                .post('/api/auth/add-product')
                .send({...testProductData})
            expect(response.status).toEqual(401);
        })

        test('returns 201 status with valid data submission and json object', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send({email, password});
            const {token} = login.body

            const response = await request(server)
                .post('/api/auth/add-product')
                .send({...testProductData})
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(201);       
            expect(response.type).toEqual('application/json');       
        })

    })

    describe('POST /api/auth/remove-product/:id', () => {
        const {email, password} = testuserData;

        beforeEach( async () => {
            await request(server)
                .post('/api/auth/register/owner')
                .send({...testuserData});
        })

        test('recieve 401 status if user is not logged in', async () => {
            const response = await request(server)
                .delete('/api/auth/remove-product/1')
            expect(response.status).toEqual(401);
        })

        test('returns 200 status and product removed with successful delete', async () => {
            const login = await request(server)
                .post('/api/auth/login')
                .send({email, password});
            const {token} = login.body
            await request(server)
                .post('/api/auth/add-product')
                .send({...testProductData})
                .set('Authorization', `Bearer ${token}`);

            const response = await request(server)
                .delete('/api/auth/remove-product/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty('deleted.item_name')       
        })

    })

    

    describe('GET /api/products', () => {
        test('returns 200 statusand returns an array', async () => {
            const response = await request(server)
                .get('/api/products')
            expect(response.status).toEqual(200);       
            expect(Array.isArray(response.body)).toBeTruthy();
        })
    })

    describe('GET /api/products/:id', () => {

        beforeEach(async () => {        
            const {email, password} = testuserData;

            await request(server)
            .post('/api/auth/register/owner')
            .send({...testuserData});

            const login = await request(server)
                .post('/api/auth/login')
                .send({email, password});

            const {token} = login.body;

            await request(server)
            .post('/api/auth/add-product')
            .send({...testProductData})
            .set('Authorization', `Bearer ${token}`); 
        })
        
        test('returns 200 status and the product object', async () => {
            const response = await request(server)
                .get('/api/products/1')
            expect(response.status).toEqual(200);       
            expect(response.body).toHaveProperty('item_name');
        })
    })

    describe('GET /api/products/categories/all', () => {
        test('returns 200 status and array', async () => {
            const response = await request(server)
                .get('/api/products/categories/all')
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy();

        })
    })
})


