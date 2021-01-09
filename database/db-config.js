const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config[process.env.DB_ENV || 'development']);




module.exports = db;