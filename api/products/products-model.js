const colors = require('colors');
const db = require('../../database/db-config.js');

module.exports = {
    find,
    findById,
    //findByCat,
    //findByUser,
    //findByLocation (User)
}


async function find() {
    try {
        return await db('products')
    } catch (err) {
        throw err;
    }
}


async function findById(productID) {
    try {
        return await db('products').where({id: productID}).first()
    } catch (err) {
        throw err;
    }
}


async function findByUser(userID) {
    return;
}
