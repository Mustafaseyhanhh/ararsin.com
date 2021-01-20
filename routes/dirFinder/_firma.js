var Firma = require('./firma')

/* GET users listing. */
function Sfirma (req, res, next) {
        Firma(req.params.il_firma_kategori, req, res, next)
};

module.exports = Sfirma;
