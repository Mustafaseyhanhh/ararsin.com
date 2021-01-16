var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var {Il,Ilce} = require("../../models/konum");
var Kategori = require("../../models/kategori");


/* GET users listing. */
function SilSilceSkategori (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Il.findOne({slug:req.params.il_firma})
    .then((il)=>{
        Ilce.findOne({il:il._id,slug:req.params.ilce_il})
        .then((ilce)=>{
            Kategori.findOne({slug:req.params.ilce_kategori_firma})
            .then((kategori)=>{
                Subs.find({il:il._id,ilce:ilce._id,kategori:kategori._id}).skip(p.skip).limit(p.limit).then((subs)=>{
                    res.render('themplate/arama', { title: 'Express' , subs,p})
                })
            })
        })
    })
};

module.exports = SilSilceSkategori;
