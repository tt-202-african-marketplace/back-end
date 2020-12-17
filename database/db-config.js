const knex = require('knex');
const config = require('../knexfile.js');
//const dotenv = require('dotenv').config();

//const db = knex(config[process.env.KNEX_ENV]);
const db = knex(config.development);


module.exports = db;