const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const productsRouter = require('./products/products-router.js')
const authRouter = require('../auth/auth-router.js')

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/products/', productsRouter);
server.use('/api/auth/', authRouter);

server.get('', (req, res)=> {
    res.send({api: 'up'})
})




module.exports = server;