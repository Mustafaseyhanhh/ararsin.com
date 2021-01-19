var {Subs,SubsData} = require('../../models/subs')
var Kategori = require("../../models/kategori")
var {Il,Ilce} = require('../../models/konum')

/* GET users listing. */
function Sfirma (req, res, next) {
    console.log("************************************ Doğru sayfa")
    Subs.findOne({slug:req.params.il_firma_kategori})
    .then((subs)=>{
        SubsData.findOne({subs_id:subs._id})
        .then((data)=>{
            Kategori.findById(subs.kategori)
            .then((kategori)=>{
                Il.findById(subs.il).then((il)=>{
                    Ilce.findById(subs.ilce)
                    .then((ilce)=>{
                        if (subs.baslik == ""){
                            title = subs.kisa_baslik +" - "+ kategori.adi +" - "+ il.adi +" - "+ ilce.adi
                        }else{
                            title = subs.kisa_baslik +" - "+ subs.baslik +" - "+ kategori.adi +" - "+ il.adi +" - "+ ilce.adi
                        }
                        //console.log(data)
                        keywords = data["etiketler"]
                        description = title
                        canonical = "/"+subs.slug
                        breadcrumb = [il.adi,ilce.adi,kategori.adi]
                        res.render('themplate/subs/subsDefault', {subs,title,keywords,description,canonical,breadcrumb, il,ilce,kategori,subs,data,harita:true})
                    })
                })
            })
        })
    })
};

module.exports = Sfirma;
