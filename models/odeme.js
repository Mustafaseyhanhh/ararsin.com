const mongoose = require('mongoose')

const OdemeSchema = new mongoose.Schema({
    user_ip:{type: String},
    user_name:{type: String},
    user_address:{type: String},
    user_phone:{type: String},
    user_basket:[],
    email:{type: String},
    payment_amount:{type:Number},
    onay:{type: Boolean, default: false},
    date : {type:Date,default:Date.now}
})

module.exports = mongoose.model('Odeme', OdemeSchema)