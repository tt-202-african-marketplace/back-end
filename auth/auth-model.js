const db = require('../database/db-config.js');

module.exports = {
    find,
    register,
}


async function find() {
    try {
        return await db('users')
    } catch (err) {
        throw err;
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