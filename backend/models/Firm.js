const mongoose = require('mongoose');
const firmSchema = new mongoose.Schema({
    firmName : {
        type : String,
        required : true,
        unique : true,
    },
    area : {
        type : String,
        required : true,
    },
    category : {
        type : [
            {
                type : String,
                enum : ['veg','non-veg']
            }
        ]
    },
    region : {
         type : [
            {
                type : String,
                enum : ['south-indian','north-indian','chinese','bakery','traditional','authentic','juices','Thickshake']
            }
         ]
    },
    offer : {
        type : String,
    },
    image : {
        type : String,
    },
    vendor : [
        {
             //relation with vendor model
            type : mongoose.Schema.Types.ObjectId,
            //relation with vendor table
            ref : 'vendor'
        }
    ],
     product:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Product'
                }
            ]
})

const Firm = mongoose.model('Firm',firmSchema);
module.exports = Firm;