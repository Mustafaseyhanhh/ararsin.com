var Firma = require('./firma')

/* GET users listing. */
function SfirmaSilSilce (req, res, next) {
    Firma(req.params.il_firma, req, res, next)
};

module.exports = SfirmaSilSilce;
