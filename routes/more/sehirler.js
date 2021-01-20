var express = require('express');
var router = express.Router();
var {Il,Ilce} = require('../../models/konum')

/* GET users listing. */
router.get('/sehirler', function(req, res, next) {
    Il.find({}).then((il)=>{
        title = "Tüm Şehirler - Ararsın.com"
        keywords = ["şehirler"]
        description = "Sitemizdeki tüm şehirler"
        canonical = env.DOMAIN_NAME+"/sehirler"
        breadcrumb = []
        res.render('themplate/more/basic_list', { title,keywords,description,canonical,breadcrumb , il})
    })
});

module.exports = router;
