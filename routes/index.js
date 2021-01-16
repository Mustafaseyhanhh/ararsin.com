var express = require('express');
var router = express.Router();
var autoImage = require('../helpers/autoImage')

/* GET home page. */
router.get('/index', function(req, res, next) {
    autoImage('deneme-deneme-denme',"uğur seyhan mustafa seyhan ipek İpek Gelişsdjksdjfksdbfjksdbf uğur seyhannnnnnnnnn mustafa seyhan ipek İpek Gelişuğur seyhan mustafa seyhan ipek İpek Geliş")
    res.send('ok')
});

module.exports = router;
