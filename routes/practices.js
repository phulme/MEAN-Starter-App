const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Practice = require('../models/practice');
const config = require('../config/database');

// Add new practice
router.post('/add', (req, res, next) => {
 let newPractice = new Practice({
    salutation: req.body.salutation,
    name: req.body.name,
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    suburb: req.body.suburb,
    postcode: req.body.postcode,
    state: req.body.state
    //user: req.body.user.id
 });

Practice.addPractice( newPractice, (err, practice) => {
     if(err) {
         res.json({success: false, msg: 'Failed to register new Practice'});
     } else {
         res.json({success: true, msg: 'Practice Added'});
     }

 })
});

// Return all practices in the system - only of use for testing
router.get('/all', (req, res) => {
    Practice.findAll(function(err, practices){
        if (err) {
            res.send('Error: Unable to return practices');
        } else {
            res.json(practices);
        }

    });
});

module.exports = router;
