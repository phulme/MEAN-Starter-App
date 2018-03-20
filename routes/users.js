const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
 let newUser = new User({
    title: req.body.title,
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    phoneMobile: req.body.phoneMobile,
    registrationNumber: req.body.registrationNumber,
    password: req.body.password,
    role: req.body.role
 });


 User.addUser(newUser, (err, user) => {
     if(err) {
         res.json({success: false, msg: 'Failed to register user'});
     } else {
         res.json({success: true, msg: 'User registered'});
     }

 })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}),  (req, res, next) => {
    console.log('Start Profile:');
    res.json({user: req.user});
   });

   // AUthenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch)=>  {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week

                });
                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        surname: User.surname,
                        registrationNumber: user.registrationNumber,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
   });

module.exports = router;
