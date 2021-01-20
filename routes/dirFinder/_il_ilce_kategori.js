var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var {Il,Ilce} = require("../../models/konum");
var Kategori = require("../../models/kategori");
var env =  require('../../env')


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
                    title = il.adi+" "+ilce.adi+" "+kategori.adi+" firmaları - Ararsın.com"
                    keywords = [il.adi+" firmaları",ilce.adi+" firmaları",kategori.adi+" firmaları",il.adi+" "+ilce.adi+" firmaları",il.adi+" "+kategori.adi+" firmaları",ilce.adi+" "+kategori.adi+" firmaları",kategori.adi+" firmaları"]
                    description = il.adi+" "+ilce.adi+" "+kategori.adi+" firmaları - Ararsın.com"
                    canonical = env.DOMAIN_NAME+"/"+il.slug+'/'+ilce.slug+'/'+kategori.slug
                    breadcrumb = [il.adi,ilce.adi,kategori.adi]
                    q = il.adi+" - "+ilce.adi+" - "+kategori.adi
                    res.render('themplate/arama', {subs,p,title,keywords,description,canonical,breadcrumb,q})
                })
            })
        })
    })
};

module.exports = SilSilceSkategori;
