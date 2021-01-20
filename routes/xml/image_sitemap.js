var createError = require('http-errors');
const xml_to = require('xml')
var express = require('express');
const env = require('../../env')
var router = express.Router();

// MODEL import
var Sitemapurl = require('../../models/subs').Subs;

/* GET home page. */
router.get('/image:digit', function (req, res, next) {
    return new Promise((resolve, reject) => {
        var sitemap = req.params.digit
        if (sitemap.slice(-4) == '.xml') {
            if (sitemap == '.xml') {
                Sitemapurl.countDocuments((err, count) => {
                    parsnum = env.SITEMAP_PARS_LIMIT
                    var sitemapList = [{
                        sitemapindex: [{
                            _attr: {
                                xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
                            }
                        }]
                    }]
                    page = parseInt(count / parsnum)
                    for (let step = 0; step < (page + 1); step++) {
                        sitemapList[0]["sitemapindex"].push({
                            sitemap: [{
                                loc: env.DOMAIN_NAME + '/image' + (step + 1) + '.xml'
                            }]
                        })
                        
                    }
                    resolve(sitemapList)
                })
            } else {
                var digit = sitemap.replace('.xml', '')
                var isnum = true;
                Array.from(digit).forEach(element => {
                    if (isNaN(element)) {
                        isnum = false;
                    }
                });
                if (isnum) {
                    sitemapnum = parseInt(digit)
                    parsnum = env.SITEMAP_PARS_LIMIT
                    Sitemapurl.countDocuments((err, count) => {
                        if (count > ((sitemapnum - 1) * parsnum)) {
                            Sitemapurl.find({}, (err, sitemapurl) => {
                                var sitemapList = [{
                                    urlset: [{
                                        _attr: {
                                            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
                                            'xmlns:image':"http://www.google.com/schemas/sitemap-image/1.1"
                                        },
                                    }]
                                }]
                                if (sitemapurl) {
                                    sitemapurl.forEach(element => {
                                        sitemapList[0]["urlset"].push({
                                            url: [{
                                                loc: env.DOMAIN_NAME +"/"+element.slug,
                                                
                                            },{"image:image" : [
                                                {"image:loc":env.DOMAIN_NAME+"/subs_image_auto/"+element.banner_image},
                                                {"image:title":element.baslik}
                                            ]}
                                            
                                        ]
                                        })
                                        //console.log(element.lastmod)
                                        
                                    })
                                    resolve(sitemapList)
                                } else {
                                    reject("Sorgu hatası oluştu")
                                }
                            }).skip(parsnum * (sitemapnum - 1)).limit(parsnum)
                        } else {
                            reject("Site haritası mevcut değil")
                        }
                    })
                } else {
                    reject('Yanlış sitemap linki. Lütfen tekrar deneyiniz');
                }
            }
        } else {
            reject('Yanlış sitemap linki. Lütfen tekrar deneyiniz');
        }
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