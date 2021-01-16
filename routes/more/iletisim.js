var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/iletisim', function(req, res, next) {
    res.render('themplate/more/iletisim', { title: 'Express'})
});

module.exports = router;
