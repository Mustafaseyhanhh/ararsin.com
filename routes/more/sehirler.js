var express = require('express');
var router = express.Router();
var {Il,Ilce} = require('../../models/konum')

/* GET users listing. */
router.get('/sehirler', function(req, res, next) {
    Il.find({}).then((il)=>{
        res.render('themplate/more/basic_list', { title: 'Tüm Şehirler' , il})
    })
});

module.exports = router;
