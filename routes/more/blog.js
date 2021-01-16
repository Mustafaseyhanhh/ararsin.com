var express = require('express');
var router = express.Router();
var Sayfalama =  require('../../helpers/sayfalama')
var Blog = require('../../models/blog')

/* GET users listing. */
router.get('/blog', function(req, res, next) {
    var p = Sayfalama(req.query["p"])
    Blog.find({}).skip(p.skip).limit(p.limit).then((blog)=>{
        res.render('themplate/more/blog', { title: 'Express', blog, p})
    })
    
});

router.get('/blog/:makale', function(req, res, next) {
    Blog.findOne({slug:req.params.makale}).then((blog)=>{
        res.render('themplate/more/blog_makale', { title: 'Express', blog})
    })
});

module.exports = router;
