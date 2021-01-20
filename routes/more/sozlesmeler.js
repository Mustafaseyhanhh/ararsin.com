var express = require('express');
var router = express.Router();
var env =  require('../../env')


/* GET users listing. */
router.get('/gizlilik-sozlesmesi', function(req, res, next) {
    title = "Gizlilik Sözleşmesi - Ararsın.com"
    keywords = ["gizlilik sözleşmesi"]
    description = ["Sitemizin gizlilik sözleşmesi ve detayları"]
    canonical = env.DOMAIN_NAME+"/gizlilik-sozlesmesi"
    breadcrumb = []
    res.render('themplate/sozlesmeler/gizlilik', { title,keywords,description,canonical,breadcrumb})
});

router.get('/icerik-ve-cerezler', function(req, res, next) {
    title = "İçerik ve Çerezler - Ararsın.com"
    keywords = ["içerik ve çerezler"]
    description = ["Sitemizin içerik ve çerezleri hakkında bilgi"]
    canonical = env.DOMAIN_NAME+"/icerik-ve-cerezler"
    breadcrumb = []
    res.render('themplate/sozlesmeler/icerik_ve_cerez', { title,keywords,description,canonical,breadcrumb})
});

router.get('/kvkk', function(req, res, next) {
    title = "Kişisel Verileri Koruma Kurulu - Ararsın.com"
    keywords = ["kişisel verileri koruma kanunu"]
    description = ["Kişisel Verileri Koruma Kurulu hakkında bilgi"]
    canonical = env.DOMAIN_NAME+"/kvkk"
    breadcrumb = []
    res.render('themplate/sozlesmeler/kvkk', { title,keywords,description,canonical,breadcrumb})
});

router.get('/hizmet-sozlesmesi', function(req, res, next) {
    title = "Hizmet Sözleşmesi - Ararsın.com"
    keywords = ["hizmet sözleşmesi"]
    description = ["Sitemizin hizmet sözleşmesi ve detayları"]
    canonical = env.DOMAIN_NAME+"/hizmet-sozlesmesi"
    breadcrumb = []
    res.render('themplate/sozlesmeler/hizmet', { title,keywords,description,canonical,breadcrumb})
});

router.get('/yasal-uyarilar', function(req, res, next) {
    title = "Yasal Uyarılar - Ararsın.com"
    keywords = ["yasal uyarılar"]
    description = ["Sitemizdeki yasal uyarılar ve detayları"]
    canonical = env.DOMAIN_NAME+"/yasal-uyarilar"
    breadcrumb = []
    res.render('themplate/sozlesmeler/yasal', { title,keywords,description,canonical,breadcrumb})
});

router.get('/yasal-bildiriler', function(req, res, next) {
    title = "Yasal Bildiriler - Ararsın.com"
    keywords = ["yasal bildiriler"]
    description = ["Sitemizdeki yasal bildiriler ve detayları"]
    canonical = env.DOMAIN_NAME+"/yasal-bildiriler"
    breadcrumb = []
    res.render('themplate/sozlesmeler/bildiri', { title,keywords,description,canonical,breadcrumb})
});

module.exports = router;