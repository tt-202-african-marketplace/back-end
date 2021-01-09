const express = require('express')
const request = require('supertest');
const router = require('./auth-router.js');

describe('auth-router.js', () => {
    describe('GET /users' , () => {
        test('it returns and array', async () => {
            const expected = [];
            const response = await request(router).get('/users');
            expect(response.body).toEqual(expected);
        })
        test.only('returns 200 status', async () => {
            const expected = 200;
            const response = await request(router).get('/users');
            expect(response.status).toEqual(expected);       
        })
    })
})
