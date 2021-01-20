var express = require('express');
var router = express.Router();
var {Subs} = require('../models/subs')
var env =  require('../env')


/* GET home page. */
router.get('/', function(req, res, next) {

    title = "Ararsın.com - Türkiyenin En Büyük Firma Rehberi"
    keywords = ["ararsın","ararsin.com","firmalar","nerede"]
    description = "Firmaları ve müşterileri bir araya getiren en büyük platform. Hemen bizimle iletişime geçin ve kapılarınızı yeni müşterilere açın."
    canonical = env.DOMAIN_NAME
    breadcrumb = ["Anasayfa"]
    //pro:true
    Subs.find({pro:true}).sort({_id: 1}).limit(6).then((subs)=>{
        res.render('themplate/anasayfa', { subs,title,keywords,description,canonical,breadcrumb})
    })
});

module.exports = router;

//keywords,description,canonical,breadcrumb