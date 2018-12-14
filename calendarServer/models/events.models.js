let pool = require('../config/connections');

let eventsFunctions = {

    getById: (id, callback) => {
        pool.query('SELECT * from events where id = ? ', id, (err, results) => {
            callback(err, results);
        });
    },

    getByUserId: (userId, callback) => {
        pool.query('SELECT events.*, calendars.*, users.username, users.id from events LEFT OUTER JOIN calendars ON events.calendarId = calendars.id LEFT OUTER JOIN users ON users.id = calendars.userId where users.id = ? ', userId, (err, results) => {
            callback(err, results);
        });
    },

    getAll: (callback) => {
        pool.query('SELECT * from events', (err, results) => {
            callback(err, results)
        });
    },

    getByCalendarId: (id, callback) => {
        pool.query('SELECT * from events where calendarId = ?', id, (err, results) => {
            callback(err, results);
        });
        // pool.query('SELECT * from events LEFT OUTER JOIN calendars ON events.calendarId = calendars.id where calendars.id = ?', calendarId, (err, results) => {
        //     callback(err, results);
        // });
    },

    deleteEvent: (id, callback) => {
        pool.query('DELETE from events where id = ?', id, (err, results) => {
            callback(err, results);
        });
    },

    updateEvent: (id, update, callback) => {
        pool.query('UPDATE events SET ? where id = ?', [update, id], (err, results) => {
            callback(err, results);
        });
    },

    addEvent: (event, callback) => {
        pool.query('INSERT INTO events SET ?', event, (err, results) => {
            callback(err, results);
        });
    }

}

module.exports = eventsFunctions;