var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var {Il,Ilce} = require("../../models/konum");
var env =  require('../../env')

/* GET users listing. */
function SilSilce (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Il.findOne({slug:req.params.il})
    .then((il)=>{
        Ilce.findOne({il:il._id,slug:req.params.ilce_kategori_firma})
        .then((ilce)=>{
            Subs.find({ilce:ilce._id}).skip(p.skip).limit(p.limit).then((subs)=>{
                title = il.adi+" "+ilce.adi+" firmaları - Ararsın.com"
                keywords = [il.adi+" firmaları",ilce.adi+" firmaları",il.adi+" "+ilce.adi+" firmaları"]
                description = il.adi+" "+ilce.adi+" firmaları - Ararsın.com"
                canonical = env.DOMAIN_NAME+"/"+il.slug+'/'+ilce.slug
                breadcrumb = [il.adi,ilce.adi]
                q = il.adi+" - "+ilce.adi
                res.render('themplate/arama', {subs,p,title,keywords,description,canonical,breadcrumb,q})
            })
        })
    })
};

module.exports = SilSilce;

