var express = require('express');
var router = express.Router();
var slug = require('slug')
var Kategori = require('../../models/kategori')
var {Il,Ilce} = require('../../models/konum')
var autoImage = require('../../helpers/autoImage')
var Sitemap = require('../../models/sitemap');
const { Subs, SubsData } = require('../../models/subs');

/* GET home page. */
router.post('/subs-ekleme', function(req, res, next) {
    Kategori.findOne({adi:req.body.kategori})
    .then((kategori)=>{
        if (!kategori){
            var kategori2= new Kategori({adi:req.body.kategori,slug:slug(req.body.kategori)})
            kategori2.save()
            Il.find({}).then((il)=>{
                il.forEach(element => {
                    var sitemap = new Sitemap({loc:"/"+il+"/"+kategori2.slug,priority:0.5})
                    sitemap.save()  
                });
            })
        }
        Il.findOne({slug:slug(req.body.il)})
        .then((il)=>{
            Ilce.findOne({slug:slug(req.body.ilce),il:il._id})
            .then((ilce)=>{
                datasub = {}
                if (kategori){
                    datasub["kategori"]=kategori._id
                }else{
                    datasub["kategori"]=kategori2._id
                }
                datasub["il"] =il._id
                if (!ilce){
                    datasub["ilce"] = "6005d795fd3a473a747eb185"
                }else{
                    datasub["ilce"] =ilce._id
                }
                datasub["baslik"] = req.body.kisa_baslik
                datasub["ek_baslik"] = req.body.uzun_baslik
                if (req.body.uzun_baslik ==""){
                    datasub["slug"] = slug(req.body.kisa_baslik)
                }else{
                    datasub["slug"] = slug(req.body.kisa_baslik+'-'+req.body.uzun_baslik)
                }
                datasub["hakkinda_kisa"]=req.body.hakkinda_kisa
                datasub["adres"]=req.body.adres
                
                if (req.body.uzun_baslik ==""){
                    autoImage(slug(req.body.kisa_baslik),req.body.kisa_baslik)
                    datasub["banner_image"] = slug(req.body.kisa_baslik)+".jpg"
                }else{
                    autoImage(slug(req.body.kisa_baslik+'-'+req.body.uzun_baslik),req.body.kisa_baslik)
                    datasub["banner_image"] = slug(req.body.kisa_baslik+'-'+req.body.uzun_baslik)+".jpg"
                }
                var num = Math.floor(Math.random() * Math.floor(4))
                if (num == 0) {
                    num = 4
                }
                datasub["profil_image"] = req.body.profil_image+num+".jpg"

                datadata={}
                datadata["saat"]=[
                    {min : "08:00", max : "18:00"},
                    {min : "08:00", max : "18:00"},
                    {min : "08:00", max : "18:00"},
                    {min : "08:00", max : "18:00"},
                    {min : "08:00", max : "18:00"},
                    {min : "08:00", max : "18:00"},
                    {min : "Kapalı", max : "Kapalı"}]
                
                datadata["etiketler"]=[]
                if (kategori){
                    var kat = kategori.adi
                }else{
                    var kat = kategori2.adi
                }
                datadata["etiketler"].push(kat+" firması")
                datadata["etiketler"].push(il.adi+' '+kat+" firması")
                if(ilce){
                    datadata["etiketler"].push(il.adi+' '+ilce.adi+' '+kat+" firması")
                }else{
                    datadata["etiketler"].push(il.adi+' Diğer '+kat+" firması")
                }
                datadata["etiketler"].push(kat)
                datadata["etiketler"].push(req.body.kisa_baslik)
                if (req.body.uzun_baslik != ""){
                    datadata["etiketler"].push(req.body.uzun_baslik)
                }
                datadata["hizmet_bolgesi"]=req.body.hizmet_bolgesi
                datadata["map_xy"]={}
                datadata["map_xy"]["enlem"]=req.body.location['enlem']
                datadata["map_xy"]["boylam"]=req.body.location['boylam']
                datadata["sosyal_medya"]=[]
                req.body.sosyalmedya.forEach(element => {
                    datadata["sosyal_medya"].push({"logo":element['logo'],"text":element['text']})
                });
                datadata["hizmetler"]=[]
                req.body.hizmetler.forEach(element => {
                    datadata["hizmetler"].push({"logo":"","text":element})
                });
                datadata["numara"]=req.body.tel
                datadata["website"]=req.body.website
                datadata["email"]=req.body.email
                datadata["hakkinda_uzun"]=req.body.hakkinda_uzun
                datadata["subs_id"]="6005e0ae7f500d314c1097b5"
                Subs.create(datasub)
                .then((subs)=>{
                    datadata["subs_id"]=subs._id
                    SubsData.create(datadata).then((data)=>{
                        var sitemap1 = new Sitemap({loc:"/"+il.slug+"/"+subs.slug,priority:0.5})
                        var sitemap2 = new Sitemap({loc:"/"+subs.slug,priority:0.5})
                        sitemap1.save()
                        sitemap2.save()
                        if(ilce){
                            var sitemap3 = new Sitemap({loc:"/"+il.slug+"/"+ilce.slug+'/'+subs.slug,priority:0.5})
                            var sitemap4 = new Sitemap({loc:"/"+subs.slug+'/'+il.slug+"/"+ilce.slug,priority:0.5})
                            sitemap3.save()
                            sitemap4.save()
                        }
                        res.send('ok')
                    })
                }).catch((err)=>{console.log("-------",err)})
                
            })
        })
    })

    
    
    


        

   



    
});

module.exports = router;
