var createError = require('http-errors');
const xml_to = require('xml')
var express = require('express');
const env = require('../../env')
var router = express.Router();
var DateFormat  = require("dateformat")

// MODEL import
var Blog = require('../../models/blog');

/* GET home page. */
router.get('/blog.xml', function (req, res, next) {
    return new Promise((resolve, reject) => {
        Blog.find({}).then((blog)=>{
            var sitemapList = [{
                urlset: [{
                    _attr: {
                        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
                    }
                }]
            }]
            if (blog) {
                blog.forEach(element => {
                    sitemapList[0]["urlset"].push({
                        url: [{
                            loc: env.DOMAIN_NAME +"/"+element.slug
                        }, {
                            priority: 1.0
                        }, {
                            lastmod:  DateFormat(new Date(element.date), "yyyy-mm-dd'T'HH:MM:ssp")
                        }]
                    })
                    //console.log(element.lastmod)
                    
                })
                resolve(sitemapList)
            } else {
                reject("Sorgu hatası oluştu")
            }
        })
        
    }).then((resolve) => {
        res.set('Content-Type', 'text/xml');
        res.send(xml_to(resolve, {
            declaration: true
        }))
    }).catch((reject) => {
        next(createError(404, reject));
    })
});

module.exports = router;