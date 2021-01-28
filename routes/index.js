var express = require('express');
var router = express.Router();
var autoImage = require('../helpers/autoImage')
const mongoose = require('mongoose')
var {Subs} = require('../models/subs')
var Kategori = require('../models/kategori')

/* GET home page. */
router.get('/index', function(req, res, next) {
    console.log("bbbbbbbbbbb")
    res.render('themplate/index', { title: 'Express'})

});




router.post('/index', function(req, res, next) {
    console.log("aaaaaaaaaaaaaaaaaaaa")
    console.log(req.body)
    res.setHeader('Content-Type', 'text/html');
    res.render('themplate/index', { title: 'Express', icerik:req.body.content})
});


module.exports = router;
