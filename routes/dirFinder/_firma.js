var {Subs} = require('../../models/subs');

/* GET users listing. */
function Sfirma (req, res, next) {
    Subs.find({slug:req.params.il_firma_kategori}).then((subs)=>{
        res.render('themplate/subs/subsDefault', { title: 'Express' , subs})
    })
};

module.exports = Sfirma;
