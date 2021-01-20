var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var Il = require("../../models/konum").Il;
var env =  require('../../env')

/* GET users listing. */
function Sil (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Il.findOne({slug:req.params.il_firma_kategori})
    .then((il)=>{
        Subs.find({il:il._id}).skip(p.skip).limit(p.limit).then((subs)=>{
            title = il.adi+" firmaları - Ararsın.com"
            keywords = [il.adi+" firmaları"]
            description = il.adi+" firmaları - Ararsın.com"
            canonical = env.DOMAIN_NAME+"/"+il.slug
            breadcrumb = [il.adi]
            q = il.adi
            res.render('themplate/arama', {subs,p,title,keywords,description,canonical,breadcrumb,q})
        })
    })
};

module.exports = Sil;