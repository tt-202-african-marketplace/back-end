const db = require('../database/db-config.js');

module.exports = {
    find,
}


async function find() {
    try {
        return await db('users')
    } catch (err) {
        throw err;
    }
}