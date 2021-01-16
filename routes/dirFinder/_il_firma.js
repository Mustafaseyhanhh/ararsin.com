var Subs = require('../../models/subs');

/* GET users listing. */
function SilSfirma (req, res, next) {
    Subs.find({slug:req.params.ilce_kategori_firma}).then((subs)=>{
        res.render('themplate/subs/subsDefault', { title: 'Express' , subs})
    })
};

module.exports = SilSfirma;
