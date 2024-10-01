const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user:'root',
    password: 'Jutt@001///',
    database: 'miniInsta'
};

const dbconnection = mysql.createPool(dbConfig);


module.exports = dbconnection.promise();