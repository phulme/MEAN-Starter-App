const mongoose = require('mongoose');
const config = require('../config/database');
const practice = require('../models/practice');
const Schema = mongoose.Schema;

const PracticeSchema = mongoose.Schema({
    name: String,
    streetNumber: String,
    streetName: String,
    suburb: String,
    postcode: Number,
    state: String,
    users: [ {type: Schema.Types.ObjectId, ref: 'User'} ]
});

const Practice = module.exports = mongoose.model('Practice', PracticeSchema);

module.exports.addPractice = function(newPractice, callback){
            newPractice.save(callback);

    };

    module.exports.asignUserToPractice = function(user, practice, callback){
        //const query = {practice: practice}
        db.practice.update({_id:practice._id}, {
            user: user._id
        })
        

};

