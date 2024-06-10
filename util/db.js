const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database : 'shop-db',
    password : 'Muaaz@mysql'
});

module.exports = pool.promise();