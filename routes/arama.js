var express = require('express');
var router = express.Router();
var {Il,Ilce,SearchBox} = require('../models/konum')
var {Subs} = require('../models/subs');
var Sayfalama =  require('../helpers/sayfalama')



router.get('/arama', function(req, res, next) {
    var canonical = "ne yazılacağı sorulacak"
    var p = Sayfalama(req.query["p"])
    var xx = req.query["q"].replace(/i/g,'İ').toUpperCase()
    var regex = new RegExp(xx, 'iu')
    if (req.query.l == 'Tüm Türkiye'){
        keywords=["Tüm Türkiye",req.query.q,req.query.q+' firmaları']
        title = "Tüm Türkiyede'ki "+ req.query.q +" firmaları arama sonuçları - Ararsın.com"
        description = title
        breadcrumb = ["Tüm Türkiye",req.query.q+' firmaları']
        Subs.find({baslik:regex}).skip(p.skip).limit(p.limit).then((subs)=>{
            res.render('themplate/arama', { title: 'Express', subs, p, q:req.query.q ,title,keywords,description,canonical,breadcrumb})
        })
    }else{
        SearchBox.findOne({searc:req.query.l}).then((searchbox)=>{
            if (searchbox.ilmi){
                Il.findOne({adi:searchbox.il}).then((il)=>{
                    Subs.find({baslik:regex,il:il._id}).skip(p.skip).limit(p.limit).then((subs)=>{
                        title =il.adi +' '+ req.query.q +" firmaları arama sonuçları - Ararsın.com"
                        description = title
                        keywords=[il.adi, req.query.q,il.adi+' firmaları', req.query.q+' firmaları']
                        breadcrumb=[il.adi, req.query.q+' firmaları']
                        res.render('themplate/arama', { title: 'Express' , subs, p, q:req.query.q,title,keywords,description,canonical,breadcrumb})
                    })
                })
            }else{
                Il.findOne({adi:searchbox.il}).then((il)=>{
                    Ilce.findOne({adi:searchbox.ilce}).then((ilce)=>{
                        Subs.find({baslik:regex,il:il._id,ilce:ilce._id}).skip(p.skip).limit(p.limit).then((subs)=>{
                            title =il.adi +' '+ilce.adi+' '+ req.query.q +" firmaları arama sonuçları - Ararsın.com"
                            description = title
                            keywords=[il.adi,ilce.adi, req.query.q,il.adi+' firmaları',ilce.adi+' firmaları', req.query.q+' firmaları',"Arama Sonuçları"]
                            breadcrumb = [il.adi,ilce.adi,req.query.q+' firmaları']
                            res.render('themplate/arama', { title: 'Express' , subs, p, q:req.query.q,title,keywords,description,canonical,breadcrumb})
                        })
                    })
                })
            }
        })

    }
})

module.exports = router;
