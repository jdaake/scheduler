 var mysql = require('mysql')
 var pool = mysql.createPool({
     connectionLimit: 10,
     host: process.env.host,
     user: process.env.user,
     password: process.env.password,
     database: process.env.database,
     port: 8889
 });

 pool.getConnection((err, connection) => {
     if (err) {
         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
             console.error('Database connection was closed.');
         }
         if (err.code === 'ER_CON_COUNT_ERROR') {
             console.error('Database has too many connections.');
         }
         if (err.code === 'ECONNREFUSED') {
             console.error('Database connection was refused.');
         }
     }
     if (connection) connection.release();
     return;
 });

 module.exports = pool;