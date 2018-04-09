const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Referral = require('../models/referral');
const config = require('../config/database');

// New referral
router.post('/new', (req, res, next) => {
 let newReferral = new Referral({
    patient: {
        firstname: req.body.patient.firstname,
        middlename: req.body.patient.middlename,
        surname: req.body.patient.surname,
        phone: [req.body.patient.phone],
        email: [req.body.patient.email],
        medicarenumber: req.body.patient.medicarenumber
    },  
    // Object ID of a practice
    practice: req.body.practice,
    // ObjectID of a practioner
    practioner: req.body.practioner,
    // Object ID of a specialist
    specialist: req.body.specialist,
    description: req.body.description,
    expiry_date: req.body.expiry_date,
    status: req.body.status,
 });
Referral.addReferral(newReferral, (err, practice) => {
     if(err) {
         console.log(err);
         res.json({success: false, msg: 'Failed to create new referral'});
     } else {
         res.json({success: true, msg: 'Referral created'});
     }

 })
});

// Return all referrals in the system - only of use for testing
router.get('/referrals', (req, res) => {
    Referral.findAll(function(err, referrals){
        if (err) {
            res.send('An error has occured');
        } else {
            console.log(referrals);
            res.json(referrals);
        }

    })
});

router.get('/referral',  (req, res, next) => {
    console.log('Return referral');
    //Referral.getReferralsByPractioner
    res.json({referral: req.user});
   });

module.exports = router;
