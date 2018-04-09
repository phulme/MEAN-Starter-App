const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Schema = mongoose.Schema;
const practice = require('../models/practice');

// User Schema
// User types are defined as: practitioner, specalist, delegate
const UserSchema = mongoose.Schema({
   title: {
        type: String
    },
    firstName: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneMobile: {
        type: String,
        required: true
    },

    practices: [{ type: Schema.Types.ObjectId, ref: 'Practice'}],
    
    registrationNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'practitioner'
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })

    })
}

module.exports.getUsersByRole = function(role, callback) {
    const query = {role: role};
    User.find(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}