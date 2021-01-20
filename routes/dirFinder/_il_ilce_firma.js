var Firma = require('./Firma')

/* GET users listing. */
function SilSilceSfirma (req, res, next) {
    Firma(req.params.ilce_kategori_firma, req, res, next)
};

module.exports = SilSilceSfirma;
