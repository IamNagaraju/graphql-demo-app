const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    age:Number,
    brandId:String
})

module.exports =  mongoose.model('User',userSchema);