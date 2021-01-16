var express = require('express');
var router = express.Router();
var Kategori = require('../../models/kategori')
var Sayfalama =  require('../../helpers/sayfalama')


/* GET users listing. */
router.get('/kategoriler', function(req, res, next) {
    var p = Sayfalama(req.query["p"])
    Kategori.find({}).skip(p.skip).limit(p.limit).then((il)=>{
        res.render('themplate/more/basic_list', { title: 'Tüm Kategoriler' , il, p})
    })
});

module.exports = router;
