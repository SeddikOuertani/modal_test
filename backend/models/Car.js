const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Car = new Schema({
    
        brand : {
            type : String
        },   
        model: {
            type: String
        },
        mileage : {
            type : Number,
        },
        price : {
            type: Number
        },
        rentPrice : {
            type : Number
        },
        forSale: {
            type : Boolean
        },
        forRent : {
            type : Boolean
        },
        available : {
            type : Boolean
        },
        visible : {
            type : Boolean
        },
        creationDate : {
            type : Date
        }
    },
    { collection: 'Cars'}
)

module.exports = mongoose.model('Car', Car);