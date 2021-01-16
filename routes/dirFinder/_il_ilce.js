var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var {Il,Ilce} = require("../../models/konum");

/* GET users listing. */
function SilSilce (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Il.findOne({slug:req.params.il})
    .then((il)=>{
        Ilce.findOne({il:il._id,slug:req.params.ilce_kategori_firma})
        .then((ilce)=>{
            Subs.find({ilce:ilce._id}).skip(p.skip).limit(p.limit).then((subs)=>{
                res.render('themplate/arama', { title: 'Express' , subs,p})
            })
        })
    })
};

module.exports = SilSilce;

