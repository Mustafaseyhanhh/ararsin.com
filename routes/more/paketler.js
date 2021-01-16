var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/paketler', function(req, res, next) {
    res.render('themplate/more/paketler', { title: 'Express'})
});

module.exports = router;
