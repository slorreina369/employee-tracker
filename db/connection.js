const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host:'localhost',
        // Your MySQL username
        user:'lorreina',
        // Your MySQL password
        password:'',
        database:'tracker'
    },
    console.log('Connected to election database.')
);

module.exports =db;