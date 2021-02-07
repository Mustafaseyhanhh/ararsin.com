const mongoose = require('mongoose')
var {Subs}=require('./subs')

const SahipSchema = new mongoose.Schema({
    subs_id: {type:mongoose.Schema.Types.ObjectId,ref:'Subs',required:true},
    adi: {type: String, required: true},
    mail: {type: String, required: true},
    sifre : {type: String, required: true, default:"12345"},
    gsm : {type: String},
    active : {type: Boolean, default: false},
    date : {type:Date,default:Date.now}
})

module.exports = mongoose.model('Sahip', SahipSchema)