var express = require('express');
var router = express.Router();
const print = (x) => {console.log(x)}
var slug = require('slug')

/* GET home page. */
router.get('/subs', function(req, res, next) {
  res.render('themplate/subs/subsDefault', { title: 'Express' })
});

module.exports = router;
