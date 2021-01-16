const env = require('../env')

/* GET users listing. */
function Sayfalama (p) {
    re = {}
    var page_number=0
        if (p>1){
            page_number = p-1
        }
    re.onceki = page_number
    re.sonraki = page_number+2
    re.skip = page_number*env.PER_PAGE
    re.limit = env.PER_PAGE
    return(re)
};

module.exports = Sayfalama;
