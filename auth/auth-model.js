const colors = require('colors');
const db = require('../database/db-config.js');

module.exports = {
    find,
    findUserById,
    register,
    findByEmail,
    addProduct,
    removeProduct,
    editProduct,
}


async function find() {
    try {
        return await db('users')
    } catch (err) {
        throw err;
    }
}

async function findUserById(userID) {
    try {
        return await db('users').where({id: userID}).first();
    } catch (err) {
        throw err;
    }
}

async function findByEmail(email) {
    try {
        const found_emails = await db('users').where({email}).first();
        console.log(`sg : auth-model : found_emails : findByEmail() : found_emails = ${found_emails}` .bgBrightBlue)
        return found_emails;
    } catch (error) {
        throw error;
    }
}

async function register(new_user_reg) {
    try {
        const registered_user = await db('users').insert(new_user_reg);
        return registered_user;
    } catch (error) {
        throw error
    }
}

async function addProduct(new_product) {
    try {
        const added_product = await db('products').insert(new_product);
        return added_product;
    } catch (error) {
        throw error
    }
}

async function removeProduct(productID) {
    try {
        const del_product = await db('products').where({id: productID}).del();
        return del_product;  
    } catch (error) {
        throw error 
    }
}

async function editProduct(productID, edits) {
    try {
        const edit_product = await db('products').where({id: productID}).update({...edits})
    } catch (error) {
        throw error 
    }
}