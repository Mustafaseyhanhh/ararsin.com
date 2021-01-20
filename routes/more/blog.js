var express = require('express');
var router = express.Router();
var Sayfalama =  require('../../helpers/sayfalama')
var Blog = require('../../models/blog')
var env =  require('../../env')

/* GET users listing. */
router.get('/blog', function(req, res, next) {
    var p = Sayfalama(req.query["p"])
    Blog.find({}).skip(p.skip).limit(p.limit).then((blog)=>{
        title = "Blog - Ararsın.com"
        keywords = ["blog"]
        description = "Ararsın sitesi blog ve tanıtım yazısı bölümü"
        canonical =  env.DOMAIN_NAME +"/blog"
        breadcrumb = []
        res.render('themplate/more/blog', {title,keywords,description,canonical,breadcrumb, blog, p})
    })
    
});

router.get('/blog/:makale', function(req, res, next) {
    Blog.findOne({slug:req.params.makale}).then((blog)=>{
        title = blog.baslik+' - Ararsın.com'
        keywords = blog.etiketler
        description = blog.description
        canonical = env.DOMAIN_NAME +"/"+blog.slug
        breadcrumb =[]
        res.render('themplate/more/blog_makale', {blog,keywords,description,canonical,breadcrumb})
    })
});

module.exports = router;
