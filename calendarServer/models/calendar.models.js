let pool = require('../config/connections');

let calendarFunctions = {

    getByUserId: (id, callback) => {
        pool.query('SELECT * from calendars where userID = ? ', id, (err, results) => {
            callback(err, results);
            // pool.query('SELECT calendars.*, users.username, users.id from calendars LEFT OUTER JOIN users ON calendars.userId = users.id ', id, (err, results) => {
            //     callback(err, results);
        });
    },

    getByCalendarId: (id, callback) => {
        pool.query('SELECT * from calendars where id = ? ', id, (err, results) => {
            callback(err, results);
        });
    },

    getAll: (callback) => {
        pool.query('SELECT * from calendars', (err, results) => {
            callback(err, results);
        });
    },

    deleteCalendar: (id, callback) => {
        pool.query('DELETE from calendars where id = ?', id, (err, results) => {
            callback(err, results);
        });
    },

    updateCalendar: (id, update, callback) => {
        pool.query('UPDATE calendars SET ? where id = ?', [update, id], (err, results) => {
            callback(err, results);
        });
    },

    addCalendar: (calendar, callback) => {
        pool.query('INSERT INTO calendars SET ?', calendar, (err, results) => {
            callback(err, results);
        });
    }
};

module.exports = calendarFunctions;