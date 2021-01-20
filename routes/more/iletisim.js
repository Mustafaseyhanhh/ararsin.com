var express = require('express');
var router = express.Router();
var env =  require('../../env')

/* GET users listing. */
router.get('/iletisim', function(req, res, next) {
    title = "İletişim - Ararsın.com"
    keywords = ["iletişim"]
    description = "Reklam, sorun ve işbirliği için bize ulaşabilirsiniz"
    canonical = env.DOMAIN_NAME+"/iletisim"
    breadcrumb = []
    res.render('themplate/more/iletisim', {title,keywords,description,canonical,breadcrumb})
});

module.exports = router;
