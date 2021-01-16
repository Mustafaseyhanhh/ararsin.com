var Subs = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var Il = require("../../models/konum").Il;

/* GET users listing. */
function Sil (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Il.findOne({slug:req.params.il_firma_kategori})
    .then((il)=>{
        Subs.find({il:il._id}).skip(p.skip).limit(p.limit).then((subs)=>{
            res.render('themplate/arama', { title: 'Express' , subs,p})
        })
    })
};

module.exports = Sil;