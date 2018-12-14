let express = require('express');
let router = express.Router();
let pool = require('../config/connections');
let user = require('../models/users.models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// send username and password to db
router.post('/login', (req, res) => {
    user.getByUsername(req.body.username, (err, results) => {
        if (err) return res.status(403).send({
            err: err
        });

        if (results.length == 0) {
            bcrypt.compareSync('plainTextPassword', 'hashedValuedFromDB');
            return res.status(403).send({
                err: 'incorrect username / password'
            });
        }
        let matching = bcrypt.compareSync(req.body.password, results[0].password);
        if (matching) return res.send({
            success: results[0]
        });
        return res.status(403).send({
            err: "Incorrect username/password"
        });
    });
});

// sign up new user
router.post('/signup', (req, res) => {
    user.getByUsername(req.body.username, (err, results) => {
        if (err) return res.status(403).send({
            err: err
        });
        if (results.length > 0) return res.status(403).send({
            err: 'Username already taken'
        });
        var hash = bcrypt.hashSync(req.body.password, 10);
        let newUser = {
            username: req.body.username,
            password: hash
        };
        user.addUser(newUser, (err, results) => {
            if (err) return res.status(403).send({
                err: err
            });
            res.send({
                success: newUser
            });
        });
    });
});

//  Get all users
router.get('/all', (req, res) => {
    user.getAll((err, results) => {
        if (err) return res.status(403).send({
            err: err
        });
        return res.send(results);
    });
});

// get user by id
router.get('/byid/:id', (req, res) => {
    user.getById(req.params.id, (err, results) => {
        if (err) return res.status(403).send({
            err: err
        });
        return res.send(results);
    });
});

// get user by username
router.get('/byusername/:username', (req, res) => {
    user.getByUsername(req.param.username, (err, results) => {
        if (err) return res.status(403).send({
            err: err
        });
        return res.send(results);
    });
});

router.delete('/delete/:id', (req, res) => {
    user.deleteUser(req.param.id, (err, results) => {
        if (err) return res.status(402).send({
            err: err
        });
        return res.send('deleted');
    });
});

router.post('/update/:id', (req, res) => {
    user.updateUser(req.param.id, req.body, (err, results) => {
        if (err) return res.status(403).send({
            err: err
        });
        return res.send('updated');
    });
});


router.post('/add', (req, res) => {
    user.addUser(req.body, (err, results) => {
        if (err) return res.status(403).send({
            err: err
        });
        return res.send('added');
    });
});


// ES5 Export 
module.exports = router;