var express = require('express');
var router = express.Router();
var {Il,Ilce} = require('../models/konum')
var Subs = require('../models/subs')
var Kategori = require('../models/kategori')

//dirFinder fonksiyonları
var SfirmaSilSilce = require('./dirFinder/_firma_il_ilce')
var Sfirma = require('./dirFinder/_firma')
var SilSfirma = require('./dirFinder/_il_firma')
var SilSilceSfirma = require('./dirFinder/_il_ilce_firma')
var SilSilceSkategori = require('./dirFinder/_il_ilce_kategori')
var SilSilce = require('./dirFinder/_il_ilce')
var SilSkategori = require('./dirFinder/_il_kategori')
var Sil = require('./dirFinder/_il')
var Skategori = require('./dirFinder/_kategori')


/* GET users listing. */
router.get('/:il_firma_kategori', function(req, res, next) {
    Il.findOne({slug:req.params.il_firma_kategori})
    .then((il)=>{
        if(il){
            Sil(req, res, next)
        }else{
            Kategori.findOne({slug:req.params.il_firma_kategori})
            .then((kategori)=>{
                if (kategori){
                    Skategori(req, res, next)
                }else{
                    Subs.findOne({slug:req.params.il_firma_kategori})
                    .then((subs)=>{
                        if (subs){
                            Sfirma(req, res, next)                    
                        }else{
                            res.send("Url Finder Error 1 (birinci parametre il,firma, kategori olmalıdır.)");
                        }
                    })
                }
            })
        }
    })
});

router.get('/:il/:ilce_kategori_firma', function(req, res, next) {
    Il.findOne({slug:req.params.il})
    .then((il)=>{
        if(il){
            Ilce.findOne({slug:req.params.ilce_kategori_firma})
            .then((ilce)=>{
                if (ilce){
                    SilSilce(req, res, next)  
                }else{
                    Kategori.findOne({slug:req.params.ilce_kategori_firma})
                    .then((kategori)=>{
                        if (kategori){
                            SilSkategori(req, res, next)
                        }else{
                            Subs.findOne({slug:req.params.ilce_kategori_firma})
                            .then((subs)=>{
                                if (subs){
                                    SilSfirma(req, res, next)
                                }else{
                                    res.send("Url Finder Error 3 (ikinci parametre ilçe, kategori, firma olmalıdır)");
                                }
                            })
                        }
                    })
                }
            })
        }else{
            res.send("Url Finder Error 2 (ilk parametre il olmalı)");
        }
    })
    
});

router.get('/:il_firma/:ilce_il/:ilce_kategori_firma', function(req, res, next) {
    Il.findOne({slug:req.params.il_firma})
    .then((il)=>{
        if(il){
            Ilce.findOne({slug:req.params.ilce_il})
            .then((ilce)=>{
                if(ilce){
                    Kategori.findOne({slug:req.params.ilce_kategori_firma})
                    .then((kategori)=>{
                        if (kategori){
                            SilSilceSkategori(req, res, next)
                        }else{
                            Subs.findOne({slug:req.params.ilce_kategori_firma})
                            .then((subs)=>{
                                if (subs){
                                    SilSilceSfirma(req, res, next)
                                }else{
                                    res.send("Url Finder Error 8 (üçüncü parametre kategori,firma olmalıdır)");
                                }
                            })
                        }
                    })
                }else{
                    res.send("Url Finder Error 7 (ilk parametre il ise ikinvi parametre ilçe olmalıdır)");
                }
            })            
        }else{
            Subs.findOne({slug:req.params.il_firma})
            .then((subs)=>{
                if (subs){
                    Il.findOne({slug:req.params.ilce_il})
                    .then((il)=>{
                        if(il){
                            Ilce.findOne({slug:req.params.ilce_kategori_firma})
                            .then((ilce)=>{
                                if (ilce){
                                    SfirmaSilSilce(req, res, next)
                                }else{
                                    res.send("Url Finder Error 6 ( üçüncü parametre ilce olmalıdır )");
                                }
                            })
                        }else{
                            res.send("Url Finder Error 5 ( ikinci parametre il olmalıdır )");
                        }
                    })
                }else{
                    res.send("Url Finder Error 4 ( ilk parametre il yada firma olmalıdır )");
                }
            })
        }
    })
});

module.exports = router;
