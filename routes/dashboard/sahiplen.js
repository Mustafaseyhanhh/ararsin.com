var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
var {Subs} = require('../../models/subs')
var Sahip = require('../../models/sahip')

/* GET home page. */
router.get('/sahiplen/:_id', function(req, res, next) {
    Subs.findOne({_id:req.params._id}).then((subs)=>{
        res.render('themplate/dashboard/sahiplen', { layout: false,subs})
    }).catch((err)=>{
        console.log(err)
        res.redirect('/404')
    })
});

router.post('/sahiplen', function(req, res, next) {
    console.log(req.body)
    Sahip.create({subs_id:req.body.firma,adi:req.body.name,mail:req.body.email,gsm:req.body.gsm}).then((sahip)=>{
        res.render('themplate/dashboard/sahiplen', { layout: false, hata:"Başvurunuz kısa zamanda incelenip şifreniz mail adresinize iletilecektir."})
    }).catch((err)=>{
        console.log(err)
        res.render('themplate/dashboard/sahiplen', { layout: false, hata:"Üzgünüz bir hata oldu. İletişim bölümünden bize ulaşarak size yardımcı olmamızı sağlayabilirsiniz. "})
    })
});

router.get('/login', function(req, res, next) {
    res.render('themplate/dashboard/login', { layout: false})
});

module.exports = router;