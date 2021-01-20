var {Subs,SubsData} = require('../../models/subs')
var Kategori = require("../../models/kategori")
var {Il,Ilce} = require('../../models/konum')
var env =  require('../../env')

/* GET users listing. */
function Firma (firma_slug, req, res, next) {
    Subs.findOne({slug:firma_slug})
    .then((subs)=>{
        console.log("////////////////////",firma_slug)
        SubsData.findOne({subs_id:subs._id})
        .then((data)=>{
            Kategori.findById(subs.kategori)
            .then((kategori)=>{
                Il.findById(subs.il).then((il)=>{
                    Ilce.findById(subs.ilce)
                    .then((ilce)=>{
                        if (subs.ek_baslik == ""){
                            title = subs.baslik +" - "+ kategori.adi +" - "+ il.adi +" - "+ ilce.adi
                        }else{
                            title = subs.baslik +" - "+ subs.ek_baslik +" - "+ kategori.adi +" - "+ il.adi +" - "+ ilce.adi
                        }
                        if (data.numara.length>0){
                            tel=data.numara[0]
                        }else{
                            tel=""
                        }
                        if (data.map_xy.enlem){
                            harita_linki="https://www.google.com.tr/maps/dir/"+data.map_xy.enlem+","+data.map_xy.boylam+"/@"+data.map_xy.enlem+","+data.map_xy.boylam+",16z"
                        }else{
                            harita_linki=""
                        }
                        
                        //console.log(data)
                        keywords = data["etiketler"]
                        description = title
                        canonical = env.DOMAIN_NAME+"/"+subs.slug
                        breadcrumb = [il.adi,ilce.adi,kategori.adi]
                        res.render('themplate/subs/subsDefault', {subs,title,keywords,description,canonical,breadcrumb,il,ilce,kategori,subs,data,harita:true,tel,harita_linki})
                    })
                })
            })
        })
    })
};

module.exports = Firma;
