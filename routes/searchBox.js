var express = require('express');
var router = express.Router();
var {SearchBox} = require('../models/konum')

/* GET home page. */
router.get('/searchbox', function(req, res, next) {
    var xx = req.query["term"].replace(/^\i/,'İ')
    var regex = new RegExp(xx, 'iu')
    var query = SearchBox.find({searc: regex}).sort({_id: 1}).limit(20);
        
    // Execute query in a callback and return users list
    query.exec(function(err, users) {
        if (!err) {
            // Method to construct the json result set
            res.send(users, {
                'Content-Type': 'application/json'
            }, 200);
        } else {
            res.send(JSON.stringify(err), {
                'Content-Type': 'application/json'
            }, 404);
       }
    });
});

module.exports = router;
