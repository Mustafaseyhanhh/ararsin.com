var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/sss', function(req, res, next) {
    res.render('themplate/more/sss', { title: 'Express'})
});

module.exports = router;
