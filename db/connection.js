const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host:'localhost',
        // Your MySQL username
        user:'testuser',
        // Your MySQL password
        password:'testpassword',
        database:'tracker'
    },
    console.log('Connected to election database.')
);

module.exports =db;