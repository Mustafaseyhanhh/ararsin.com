var Subs = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var {Il} = require("../../models/konum");
var Kategori = require("../../models/kategori");


/* GET users listing. */
function SilSkategori (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Il.findOne({slug:req.params.il})
    .then((il)=>{
        Kategori.findOne({slug:req.params.ilce_kategori_firma})
        .then((kategori)=>{
            Subs.find({il:il._id,kategori:kategori._id}).skip(p.skip).limit(p.limit).then((subs)=>{
                res.render('themplate/arama', { title: 'Express' , subs,p})
            })
        })
    })
};
module.exports = SilSkategori;


