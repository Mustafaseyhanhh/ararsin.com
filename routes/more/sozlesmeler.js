var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/gizlilik-sozlesmesi', function(req, res, next) {
    res.render('themplate/sozlesmeler/gizlilik', { title: 'Express'})
});

router.get('/icerik-ve-cerezler', function(req, res, next) {
    res.render('themplate/sozlesmeler/icerik_ve_cerez', { title: 'Express'})
});

router.get('/kvkk', function(req, res, next) {
    res.render('themplate/sozlesmeler/kvkk', { title: 'Express'})
});

router.get('/hizmet-sozlesmesi', function(req, res, next) {
    res.render('themplate/sozlesmeler/hizmet', { title: 'Express'})
});

router.get('/yasal-uyarilar', function(req, res, next) {
    res.render('themplate/sozlesmeler/yasal', { title: 'Express'})
});

module.exports = router;