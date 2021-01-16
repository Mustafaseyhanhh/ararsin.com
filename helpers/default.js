var DateFormat  = require("dateformat")

module.exports ={
    logo : (req) => {
        var logo = Math.floor(Math.random() * Math.floor(10))
        if (logo==0){
            logo = 5
        }
        return logo
    },

    karakter : (req , num) => {
        return req.slice(0,num)
    },

    each_limit : (ary, max, options) => {
        if(!ary || ary.length == 0)
            return options.inverse(this);
        var result = [ ];
        for(var i = 0; i < max && i < ary.length; ++i)
            result.push(options.fn(ary[i]));
        return result.join('');
    },

    date_format : (utc) => {
        return DateFormat(new Date(utc), "dd-mm-yyyy h:MM:ss");
    },

    iff : (val1, val2) => {
        return (val1 == val2) ? true : false;
    },

    footer_blog : () => {
        
        return require("./data/footer_blog").footer_blog
    },

    footer_etiket : () => {
        return require("./data/footer_etiket").footer_etiket
    },

    home_referans : () => {
        return require("./data/home_referans").home_referans
    }
}