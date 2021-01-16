var express = require('express');
var router = express.Router();
var {Il,Ilce,SearchBox} = require('../models/konum')
var Subs = require('../models/subs');
var Sayfalama =  require('../helpers/sayfalama')


router.get('/arama', function(req, res, next) {
    var p = Sayfalama(req.query["p"])
    var xx = req.query["kutu1"].replace(/i/g,'İ').toUpperCase()
    var regex = new RegExp(xx, 'iu')
    if (req.query.kutu2 == 'Tüm Türkiye'){
        Subs.find({baslik:regex}).skip(p.skip).limit(p.limit).then((subs)=>{
            res.render('themplate/arama', { title: 'Express' , subs,p})
        })
    }else{
        SearchBox.findOne({searc:req.query.kutu2}).then((searchbox)=>{
            if (searchbox.ilmi){
                Il.findOne({adi:searchbox.il}).then((il)=>{
                    Subs.find({baslik:regex,il:il._id}).skip(p.skip).limit(p.limit).then((subs)=>{
                        res.render('themplate/arama', { title: 'Express' , subs,p})
                    })
                })
            }else{
                Il.findOne({adi:searchbox.il}).then((il)=>{
                    Ilce.findOne({adi:searchbox.ilce}).then((ilce)=>{
                        Subs.find({baslik:regex,il:il._id,ilce:ilce._id}).skip(p.skip).limit(p.limit).then((subs)=>{
                            res.render('themplate/arama', { title: 'Express' , subs,p})
                        })
                    })
                })
            }
        })

    }
})

module.exports = router;
