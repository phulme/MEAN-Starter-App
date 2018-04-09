const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const User = require('../models/user');
const Schema = mongoose.Schema;

const ReferralSchema = mongoose.Schema({
    patient: {
        firstname: String,
        middlename: String,
        surname: String,
        phone: [String],
        email: [String],
        medicarenumber: Number
    },

    practioner: {
        type: Schema.Types.ObjectId,
        ref: 'Practice'

    },

    practioner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    specialist: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    description: {
        type: String
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    expiry_date: {
        type: Date
    },

    status: {
        type: String,
        default: 'new'
    }
});


const Referral = module.exports = mongoose.model('Referral', ReferralSchema);

module.exports.addReferral = function (newReferral, callback) {
    newReferral.save(callback);
};

module.exports.getReferralById = function(id, callback) {
    Referral.findById(id, callback);
}

module.exports.findAll = function(callback) {
    // Referral.find({}, callback).populate('Practioner').populate('Specialist').exec();
    Referral.find({}).populate('practioner').populate('specialist').exec(callback);
}

module.exports.getReferalsByPatient = function(medicarenumber, callback) {
    const query = {medicarenumber: medicarenumber}
    User.find(query, callback);
}

module.exports.getReferralsByPractioner = function(practioner, callback) {
    const query = {practioner: practioner};
    Referral.find(query, callback);
}
