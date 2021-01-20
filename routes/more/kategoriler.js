var express = require('express');
var router = express.Router();
var Kategori = require('../../models/kategori')
var Sayfalama =  require('../../helpers/sayfalama')
var env =  require('../../env')



/* GET users listing. */
router.get('/kategoriler', function(req, res, next) {
    var p = Sayfalama(req.query["p"])
    Kategori.find({}).skip(p.skip).limit(p.limit).then((il)=>{
        title = "Tüm Kategoriler - Ararsın.com"
        keywords = ["kategoriler"]
        description = "Sitemizdeki tüm kategoriler"
        canonical = env.DOMAIN_NAME+"/kategoriler"
        breadcrumb = []
        res.render('themplate/more/basic_list', {title,keywords,description,canonical,breadcrumb, il, p})
    })
});

module.exports = router;
