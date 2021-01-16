const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    baslik: {type: String, required: true},
    slug : {type: String, required: true, unique: true},
    kisa_yazi : {type: String},
    //resimleri de icerik kısmında dahil edeceğiz.
    icerik : [{etiket:{type:String},icerik:{type:String}}],
    ana_resim : {type: String},
    etiketler : [],
    yazar : {type: String},
    ziyaretci : {type:Number},
    //Seo için !!!
    title : {type: String},
    keywords : [],
    description : {type: String},
    breadcrumbs : [],
    date : {type:Date,default:Date.now}
})

module.exports = mongoose.model('Blog', BlogSchema)