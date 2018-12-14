let pool = require('../config/connections');

let userFunctions = {

    getByUsername: (username, callback) => {
        pool.query('SELECT * from users where username = ? ', username, (err, results) => {
            callback(err, results);
        });
    },

    getById: (id, callback) => {
        pool.query('SELECT * from users where id = ? ', id, (err, results) => {
            callback(err, results);
        });
    },

    getAll: (callback) => {
        pool.query('SELECT * from users', (err, results) => {
            callback(err, results);
        });
    },

    deleteUser: (id, callback) => {
        pool.query('DELETE from users where id = ?', id, (err, results) => {
            callback(err, results);
        });
    },

    updateUser: (id, update, callback) => {
        pool.query('UPDATE users SET ? where id = ?', [update, id], (err, results) => {
            callback(err, results);
        });
    },

    addUser: (user, callback) => {
        pool.query('INSERT INTO users SET ?', user, (err, results) => {
            callback(err, results);
        });
    }

}

module.exports = userFunctions;