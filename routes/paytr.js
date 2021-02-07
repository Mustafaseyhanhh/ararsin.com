var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var htmlentities = require('html-entities')
var request = require("request")
var jsSHA = require("jssha")

var estimateHash = (str, key) => {
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.setHMACKey(key, "TEXT");
    shaObj.update(str);
    return shaObj.getHMAC("B64");
}

/* GET home page. */
router.get('/get_token', function(req, res, next) {
    
    
        merchant_id = '214999';
		merchant_key = 'PQ7nj7rstC67TDxP';
		merchant_salt = 'gn8kjT1ASSmGsW6m';
		merchant_ok_url="http://google.com";
		merchant_fail_url="http://yandex.com";
        user_basket = [["Altis Renkli Deniz Yatağı - Mavi", "18.00", 1],["Pharmasol Güneş Kremi 50+ Yetişkin & Bepanthol Cilt Bakım Kremi", "33,25", 2]]
		merchant_oid = Math.floor(Math.random() * Math.floor(1000000000000000000000)).toString().replace(".","")+"asd";
        console.log(merchant_oid)
		test_mode="1";
		//3d'siz işlem
		non_3d="0";
		//Ödeme süreci dil seçeneği tr veya en
        client_lang = "tr";
		//non3d işlemde, başarısız işlemi test etmek için 1 gönderilir (test_mode ve non_3d değerleri 1 ise dikkate alınır!)
		non3d_test_failed="0";
        user_ip = "85.96.216.35";
		email = "testnon3d@paytr.com";
		// 100.99 TL ödeme
		payment_amount = "10099";
		currency="TL";
        debug_on="1"
        no_installment="0"
        max_installment="0"


        user_name="Paytr Test"
        user_address="test test test"
        user_phone="05555555555"
		//
        payment_type = "card";
        //$card_type = "bonus";       // Alabileceği değerler; advantage, axess, combo, bonus, cardfinans, maximum, paraf, world
		installment_count = "0";
        post_url = "https://www.paytr.com/odeme";
		hash_str = "" + merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket + no_installment + max_installment + currency + test_mode
        var hash = crypto.createHmac('sha256', merchant_key);
        hash.update(hash_str+merchant_salt);
        var paytr_token2 = hash.digest('base64');
        console.log(paytr_token2)
        var user_basket = JSON.stringify(user_basket).toString("base64");
        var hash_str = "" + merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket + no_installment + max_installment + currency + test_mode;
        var paytr_token = estimateHash("" + hash_str + merchant_salt, merchant_key);

        var options = {
            url: 'https://www.paytr.com/odeme/api/get-token',
            formData: {
                merchant_id: merchant_id, user_ip: user_ip, merchant_oid: merchant_oid, email: email, payment_type:payment_type, payment_amount: payment_amount, paytr_token: paytr_token,
                user_basket: user_basket, debug_on: debug_on, user_name: user_name, user_address: user_address,no_installment:no_installment,max_installment:max_installment,
                user_phone: user_phone, merchant_ok_url: merchant_ok_url, merchant_fail_url: merchant_fail_url, currency: currency, test_mode: test_mode
            }
        }
        new Promise(function (res, rej) {
            request.post(options, function (error, response, body) {
                if (error) throw new Error(error);

                var _JSON$parse = JSON.parse(body),
                    status = _JSON$parse.status,
                    reason = _JSON$parse.reason,
                    token = _JSON$parse.token;

                if (status === "failed") {
                    rej(reason);
                }
                if (status === "success") {
                    res({ token: token });
                }
            });
        }).then((token)=>{
            console.log(token)
            res.render('themplate/odeme', { layout: false,key:token})
        }).catch((reason)=>{
            console.log(reason)
            res.send(reason)
        });


        //res.render('themplate/odeme', { title: 'Güvenli Ödeme',post_url,merchant_id,user_ip,merchant_oid,email,payment_type,payment_amount,currency,test_mode,non_3d,merchant_ok_url,merchant_fail_url,user_basket,client_lang,client_lang,token,non3d_test_failed,installment_count})
    
});

router.post('/callback', function(req, res, next) {
    console.log("geri bildirim geldi........................................")
    console.log(req.body)
    res.send("OK");
});

router.post('/odeme', function(req, res, next) {
    res.send("OK");
});

module.exports = router;
