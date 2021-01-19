const mongoose=require('mongoose')
var Kategori=require('./kategori')
var {Il,Ilce,Mahalle}=require('./konum')


const SubsSchema = new mongoose.Schema({
    baslik : {type:String,required:true},
    ek_baslik : {type:String},
    slug : {type:String,required:true},
    priority : {type: Number, default:1},
    kategori : {type:mongoose.Schema.Types.ObjectId,ref:'Kategori',required:true},
    premium : {type: Boolean, default: false},
    premium_paket : {type:Number,default:0},
    hakkinda_kisa : {type:String},
    adres : {type:String},
    il : {type:mongoose.Schema.Types.ObjectId,ref:'Il'},
    ilce : {type:mongoose.Schema.Types.ObjectId,ref:'Ilce'},
    mahalle : {type:mongoose.Schema.Types.ObjectId,ref:'Mahalle'},
    profil_image : {type:String},
    banner_image : {type:String},
    degerlendirme : {type: Number, default:0},
    yildiz : {type: Number, default:5},
    lastmod : {type:Date,default:Date.now}
})

const SubsDataSchema = new mongoose.Schema({
    subs_id : {type:mongoose.Schema.Types.ObjectId,ref:'SubsSchema',required:true},
    resimler : [],
    saat : [{min : {type:String}, max : {type:String}}],
    etiketler : [],
    ziyaretci_sayisi : {type: Number, default:0},
    hizmet_bolgesi : {type:String,default:'Hizmet Bölgesi Belirtilmemiştir.'},
    map_xy : {enlem:{type:String},boylam:{type:String}},
    sosyal_medya : [{logo:{type:String},text:{link:String}}],
    hizmetler : [{logo:{type:String},text:{type:String}}],
    numara : [],
    website : [],
    email : [],
    hakkinda_uzun : [],
})


module.exports = {
    'Subs': mongoose.model('Subs', SubsSchema),
    'SubsData': mongoose.model('SubsData', SubsDataSchema)
}