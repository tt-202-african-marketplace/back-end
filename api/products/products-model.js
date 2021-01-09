const colors = require('colors');
const db = require('../../database/db-config.js');

module.exports = {
    find,
    findById,
    findCat,
    findByCat,
    findByUser,
    findByLocation
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

async function findCat() {
    try {
        return await db('categories')
    } catch (err) {
        throw err;
    }
}

async function findByCat(categoryID) {
    try {
        return await db('products').where({category_id: categoryID})
    } catch (err) {
        throw err;
    }
}

async function findByUser(userID) {
    try {
        return await db('products').where({user_id: userID})
    } catch (err) {
        throw err;
    }
}

async function findByLocation(locationID) {
    try {
        return await db('products')
            .join('users', 'users.id', '=', 'products.user_id')
            .where({location_id: locationID})
            .select('user_id','products.id', 'products.item_name', 'products.price')
    } catch (error) {
        
    }
}