var express = require('express');
var router = express.Router();
const paytr = require('node-paytr')

/* GET home page. */
router.get('/odeme/get_token', function(req, res, next) {
    merchant_id = "214999"
    user_ip = 
    merchant_oid = "2152165421"
    email = "a@mail.com"
    payment_amount = (34.50)*100
    user_basket =
    no_installment =
    max_installment =
    paytr_token =
    user_name =
    user_address =
    user_phone =
    merchant_ok_url =
    merchant_fail_url =

    const user_params = req.body();
    res.post(paytr.getToken(user_params));
});

router.post('/odeme/callback', function(req, res, next) {
    paytr.getPost(req.body, ({merchant_oid, status}) => {
        console.log("ödeme callback")
    });
    res.send("OK");
});

module.exports = router;
