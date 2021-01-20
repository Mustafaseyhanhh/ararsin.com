var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var Kategori = require("../../models/kategori");
var env =  require('../../env')

/* GET users listing. */
function Skategori (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Kategori.findOne({slug:req.params.il_firma_kategori})
    .then((kategori)=>{
        Subs.find({kategori:kategori._id}).skip(p.skip).limit(p.limit).then((subs)=>{
            title = kategori.adi+" firmaları - Ararsın.com"
            keywords = [kategori.adi+" firmaları"]
            description = kategori.adi+" firmaları - Ararsın.com"
            canonical = env.DOMAIN_NAME+"/"+kategori.slug
            breadcrumb = [kategori.adi]
            q = kategori.adi
            res.render('themplate/arama', {subs,p,title,keywords,description,canonical,breadcrumb,q})
        })
    })
};

module.exports = Skategori;