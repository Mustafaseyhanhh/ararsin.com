var express = require('express');
var router = express.Router();
var autoImage = require('../helpers/autoImage')
const mongoose = require('mongoose')
var {Subs} = require('../models/subs')
var Kategori = require('../models/kategori')

/* GET home page. */
router.get('/index', function(req, res, next) {
    console.log("aaaaaaaaaaaaaaaaaaaa")
    Subs.aggregate([{
        $match: {
            
        }
    },{
        $lookup: {
            from: 'kategoris',
            localField: 'kategori',
            foreignField: '_id',
            as: 'kategori'
        }
    },
    { "$limit": 3 },
    { "$skip": 2 },
    {
        $unwind: '$kategori',
    }],(error,sohbetUser)=>{
        sohbetUser.forEach(sohbet => {
            console.log(sohbet)            
        })
        res.send(sohbetUser)
    })
});

module.exports = router;
