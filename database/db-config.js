const knex = require('knex');
const config = require('../knexfile.js');
const dotenv = require('dotenv').config();

const db = knex(config[process.env.NODE_ENV]);




module.exports = db;