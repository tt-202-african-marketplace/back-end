const server = require('./api/server.js');
const colors = require('colors');
const dotenv = require('dotenv').config()


const PORT = process.env.PORT;
server.listen(PORT, ()=> {
    console.log(`
        *** Hello, I'm listening on port ${PORT} :) *** 
    ` .rainbow)
});