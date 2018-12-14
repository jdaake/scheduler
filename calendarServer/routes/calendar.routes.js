let express = require('express');
let router = express.Router();
let pool = require('../config/connections');
let calendar = require('../models/calendar.models');

// get calendars by userId
router.get('/byUser/:id', (req, res) => {
    calendar.getByUserId(req.params.id, (err, results) => {
        if (err) return res.status(404).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});


// Get calendar by ID
router.get('/byid/:id', (req, res) => {
    calendar.getByCalendarId(req.params.id, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        console.log(res);
        return res.send({
            success: results
        });
    });
});

// get all calendars
router.get('/all', (req, res) => {
    calendar.getAll((err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});


// Delete calendar by id
router.delete('/delete/:id', (req, res) => {
    calendar.deleteCalendar(req.params.id, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});

// Update calendar by id
router.post('/update/:id', (req, res) => {
    calendar.updateCalendar(req.params.id, req.body, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});

// Add new calendar
router.post('/add', (req, res) => {
    calendar.addCalendar(req.body, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});


// ES5 Export 
module.exports = router;