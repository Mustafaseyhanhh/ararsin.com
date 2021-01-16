var express = require('express');
var router = express.Router();
var {Subs} = require('../models/subs')


/* GET home page. */
router.get('/', function(req, res, next) {
    Subs.find({pro:true}).sort({_id: 1}).limit(6).then((subs)=>{
        res.render('themplate/anasayfa', { title: 'Express',subs})
    })
});

module.exports = router;
