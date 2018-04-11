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
        firstname: req.body.patient.p_firstname,
        middlename: req.body.patient.p_middlename,
        surname: req.body.patient.p_surname,
        phone: [req.body.patient.p_phone],
        email: [req.body.patient.p_email],
        medicarenumber: req.body.patient.p_medicarenumber
    },  
    practice: req.body.practice,
    practioner: req.body.practioner,
    specialist: req.body.specialist,
    description: req.body.description,
    expiry_date: req.body.expiry,
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
