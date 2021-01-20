var express = require('express');
var router = express.Router();
var env =  require('../../env')

/* GET users listing. */
router.get('/sss', function(req, res, next) {
    title = "Sıkça Sorulan Sorular - Ararsin.com"
    keywords = ["sıkça sorulan sorular"]
    description = "Sitemiz ve bizim hakkımızda merak ettikleriniz"
    canonical = env.DOMAIN_NAME+"/sss"
    breadcrumb = []
    res.render('themplate/more/sss', {title,keywords,description,canonical,breadcrumb})
});

module.exports = router;
