var express = require('express');
var router = express.Router();
var env =  require('../../env')

/* GET users listing. */
router.get('/hakkimizda', function(req, res, next) {
    title = "Hakkımızda - Ararsın.com"
    keywords = ["hakkımızda"]
    description = ["Sitemiz ve bizim hakkımızda öğrenmek istediğiniz herşey"]
    canonical = env.DOMAIN_NAME+"hakkimizda"
    breadcrumb = []
    res.render('themplate/more/hakkimizda', {title,keywords,description,canonical,breadcrumb})
});

module.exports = router;
