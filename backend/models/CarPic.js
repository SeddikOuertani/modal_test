const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let CarPic = new Schema({
    
        name : {
            type : String,
        },
        carId : {
            type : String,
        },
        file : {
            fieldname : { type : String },
            originalname : { type : String },
            encoding : { type : String },
            encoding : { type : String },
            mimetype : { type : String },
            buffer : { type : Buffer },
        }

    },
    { collection: 'CarPics'}
)

module.exports = mongoose.model('CarPic', CarPic);