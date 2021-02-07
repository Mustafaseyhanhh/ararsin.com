var express = require('express');
const { token } = require('morgan');
var router = express.Router();
var Odeme = require('../models/odeme')
var PayTR=require('node-paytr')

merchant_params ={
    merchant_id : "214999",
    merchant_key : "PQ7nj7rstC67TDxP",
    merchant_salt : "gn8kjT1ASSmGsW6m",
    debug_on : 0,
    no_installment:	1,
    max_installment : 12,
    timeout_limit : 10,
    test_mode : 0
}

const paytr = new PayTR(merchant_params);

/* GET home page. */
router.get('/get_token', function(req, res, next) {
    var user_params={
        user_ip:"85.96.216.35",
        user_name:"Paytr Test",
        user_address:"test test test",
        user_phone:"055555555",
        user_basket:[["Altis Renkli Deniz Yatağı - Mavi", "100.00", 1],["Pharmasol Güneş Kremi 50+ Yetişkin & Bepanthol Cilt Bakım Kremi", "0.99", 1]],
        email:"mustafaseyhanhh@gmail.com",
        payment_amount:10099,
        currency:"TL",
        merchant_ok_url:"https://ararsin.com/odeme/basarili",
        merchant_fail_url:"https://ararsin.com/odeme/hata"  
    }
    Odeme.create({user_ip:user_params.user_ip,user_name:user_params.user_name,user_address:user_params.user_address, user_phone:user_params.user_phone,user_basket:user_params.user_basket,email:user_params.email,payment_amount:user_params.payment_amount}).then((odeme)=>{
        user_params["merchant_oid"]=(odeme._id).toString()
        paytr.getToken(user_params).then((token)=>{
            res.render('themplate/odeme', { layout: false,token:token.token})
        }).catch((err)=>{
            console.log("-----------------",err)
        })
    }).catch((err)=>{
        console.log(err)
        res.redirect('/404')
    })
});

router.post('/callback', function(req, res, next) {
    paytr.getPost(req.body, ({merchant_oid, status}) => {
        console.log(req.body)
        if ( status === "success"){
            Odeme.findByIdAndUpdate({merchant_oid},{onay:true},(err,odeme)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(odeme)
                }
            })
        }
    });
    res.send("OK");
});

router.post('/odeme', function(req, res, next) {
    res.send("OK");
});

module.exports = router;
