const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: String,
    description:String
})

module.exports =  mongoose.model('Brand',brandSchema);