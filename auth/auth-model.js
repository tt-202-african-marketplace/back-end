const colors = require('colors');
const db = require('../database/db-config.js');

module.exports = {
    find,
    register,
    findByEmail,
}


async function find() {
    try {
        return await db('users')
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