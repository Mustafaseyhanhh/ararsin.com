var {Subs} = require('../../models/subs');
var Sayfalama =  require('../../helpers/sayfalama')
var Kategori = require("../../models/kategori");
var env =  require('../../env')

/* GET users listing. */
function Skategori (req, res, next) {
    var p = Sayfalama(req.query["p"])
    Kategori.findOne({slug:req.params.il_firma_kategori})
    .then((kategori)=>{
        Subs.aggregate([{
            $match: {
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