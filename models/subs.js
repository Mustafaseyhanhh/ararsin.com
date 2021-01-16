const mongoose=require('mongoose')
var Kategori=require('./kategori')
var Il=require('./konum').Il
var Ilce=require('./konum').Ilce
var Mahalle=require('./konum').Mahalle


const SubsSchema = new mongoose.Schema({
    kisa_baslik : {type:String},
    baslik : {type:String,required:true},
    slug : {type:String,required:true},
    priority : {type: Number, default:1},
    kategori : {type:mongoose.Schema.Types.ObjectId,ref:'Kategori',required:true},
    premium : {type: Boolean, default: false},
    pro : {type: Boolean, default: false},
    hakkinda_kisa : {type:String},
    hakkinda_uzun : {type:String},
    adres : {type:String},
    il : {type:mongoose.Schema.Types.ObjectId,ref:'Il'},
    ilce : {type:mongoose.Schema.Types.ObjectId,ref:'Ilce'},
    mahalle : {type:mongoose.Schema.Types.ObjectId,ref:'Mahalle'},
    numara : [],
    website : [],
    email : [],
    sosyal_medya : [{logo:{type:String},text:{link:String}}],
    hizmetler : [{logo:{type:String},text:{type:String}}],
    map_xy : [],
    resimler : [],
    profil_image : {type:String},
    banner_image : {type:String},
    saat : [{min : {type:String}, max : {type:String}}],
    hizmet_bolgesi : {type:String,default:'Hizmet Bölgesi Belirtilmemiştir.'},
    etiketler : [],
    ziyaretci_sayisi : {type: Number, default:0},
    lastmod : {type:Date,default:Date.now}
})

module.exports=mongoose.model('Subs',SubsSchema)