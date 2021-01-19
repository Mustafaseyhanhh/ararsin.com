var express = require('express');
var router = express.Router();
var {Subs} = require('../models/subs')


/* GET home page. */
router.get('/', function(req, res, next) {

    title = "Ararsın.com"
    keywords = ["firma rehberi","ararsın","ararsin.com","firmalar","nerede"]
    description = "Firmaları ve müşterileri bir araya getiren en büyük platform. Ararsın com ile hemen iletişime geçip yeni müşteriler kazanın."
    canonical = "ararsin.com"
    breadcrumb = ["Anasayfa"]

    Subs.find({pro:true}).sort({_id: 1}).limit(6).then((subs)=>{
        res.render('themplate/anasayfa', { subs,title,keywords,description,canonical,breadcrumb})
    })
});

module.exports = router;

//keywords,description,canonical,breadcrumb