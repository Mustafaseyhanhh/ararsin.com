var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var Kategori = require("../../models/kategori");

/* GET users listing. */
function Skategori (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Kategori.findOne({slug:req.params.il_firma_kategori})
    .then((kategori)=>{
        Subs.find({kategori:kategori._id}).skip(p.skip).limit(p.limit).then((subs)=>{
            res.render('themplate/arama', { title: 'Express' , subs,p})
        })
    })
};

module.exports = Skategori;