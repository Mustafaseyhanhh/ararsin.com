var express = require('express');
var router = express.Router();
var env =  require('../../env')

/* GET users listing. */
router.get('/paketler', function(req, res, next) {
    title = "Paketler - Ararsın.com"
    keywords = ["paketler"]
    description = "Sitemizde sahip olabileceğiniz ayrıcalıklar ve detayları"
    canonical = env.DOMAIN_NAME+'/paketler'
    breadcrumb = []
    res.render('themplate/more/paketler', {title,keywords,description,canonical,breadcrumb})
});

module.exports = router;
