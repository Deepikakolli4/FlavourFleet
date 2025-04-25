const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required : true
    },
    firm:[
        {
          //relation with firm model
          type : mongoose.Schema.Types.ObjectId,
          //referece with firm table
          ref : 'Firm'
        }
    ]
})

const Vendor = mongoose.model('Vendor',vendorSchema);

module.exports = Vendor;