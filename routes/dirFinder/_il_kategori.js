var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var {Il} = require("../../models/konum");
var Kategori = require("../../models/kategori");
var env =  require('../../env')


/* GET users listing. */
function SilSkategori (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Il.findOne({slug:req.params.il})
    .then((il)=>{
        Kategori.findOne({slug:req.params.ilce_kategori_firma})
        .then((kategori)=>{
            Subs.aggregate([{
                $match: {
                    il:il._id,
                    kategori:kategori._id
                }
            },{
                $lookup: {
                    from: 'kategoris',
                    localField: 'kategori',
                    foreignField: '_id',
                    as: 'kategori'
                }
            },
            { "$limit": p.limit+p.skip },
            { "$skip": p.skip },
            {
                $unwind: '$kategori',
            }],(error,subs)=>{
                title = il.adi+" "+kategori.adi+" firmaları - Ararsın.com"
                keywords = [il.adi+" firmaları",kategori.adi+" firmaları",il.adi+" "+kategori.adi+" firmaları"]
                description = il.adi+" "+kategori.adi+" firmaları - Ararsın.com"
                canonical = env.DOMAIN_NAME+"/"+il.slug+'/'+kategori.slug
                breadcrumb = [il.adi,kategori.adi]
                q = il.adi+" - ",kategori.adi
                res.render('themplate/arama', {subs,p,title,keywords,description,canonical,breadcrumb,q})
            })
        })
    })
};
module.exports = SilSkategori;


