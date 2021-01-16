var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/hakkimizda', function(req, res, next) {
    res.render('themplate/more/hakkimizda', { title: 'Express'})
});

module.exports = router;
