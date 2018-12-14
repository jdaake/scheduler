let express = require('express');
let router = express.Router();
let pool = require('../config/connections');
let events = require('../models/events.models');


// Get event by ID
router.get('/byid/:id', (req, res) => {
    events.getById(req.params.id, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});

// get by userId
router.get('/byUser/:id', (req, res) => {
    events.getByUserId(req.params.id, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
})

// get all events
router.get('/all', (req, res) => {
    events.getAll((err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});

// Get all Events by calendarId
// http: //localhost:3000/api/events/byCalendarId/18
router.get('/byCalendarId/:id', (req, res) => {
    events.getByCalendarId(req.params.id, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});

// Delete event by id
router.delete('/delete/:id', (req, res) => {
    events.deleteEvent(req.params.id, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});

// Update event by id
router.post('/update/:id', (req, res) => {
    events.updateEvent(req.param.id, req.body, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send({
            success: results
        });
    });
});

// Add new event
router.post('/add', (req, res) => {
    events.addEvent(req.body, (err, results) => {
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