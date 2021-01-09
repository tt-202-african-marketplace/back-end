const colors = require('colors');
const db = require('../../database/db-config.js');

module.exports = {
    find,
    findById,
}


async function find() {
    try {
        return await db('locations')
    } catch (err) {
        throw err;
    }
}


async function findById(locationID) {
    try {
        return await db('locations').where({id: locationID}).first()
    } catch (err) {
        throw err;
    }
}