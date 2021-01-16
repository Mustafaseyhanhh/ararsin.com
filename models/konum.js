const mongoose = require('mongoose')

const KonumSchema = new mongoose.Schema({
    "il": {
        type: String
    },
    "yil": {
        type: String
    },
    "nufus": {
        type: String
    },
    "erkek": {
        type: String
    },
    "kadin": {
        type: String
    },
    "il_hakkinda": [],
    "nufus_yil_il": [],
    "nufus_il_yas_2019": [],
    "ilceler": [{
        "ilce": {
            type: String
        },
        "yil": {
            type: String
        },
        "nufus": {
            type: String
        },
        "erkek": {
            type: String
        },
        "kadin": {
            type: String
        },
        "ilce_hakkinda": [],
        "mahalleler": [{
            "yil": {
                type: String
            },
            "mahalle": {
                type: String
            },
            "mahalle_nufus": {
                type: String
            }
        }]
    }]
})

const IlSchema = new mongoose.Schema({
    adi: {
        type: String
    },
    slug: {
        type: String
    }
})

const IlceSchema = new mongoose.Schema({
    adi: {
        type: String
    },
    slug: {
        type: String
    },
    il: {type: mongoose.Schema.Types.ObjectId, ref: 'IlSchema' ,required: true},
})

const MahalleSchema = new mongoose.Schema({
    adi: {
        type: String
    },
    slug: {
        type: String
    },
    ilce: {type: mongoose.Schema.Types.ObjectId, ref: 'IlceSchema' ,required: true},
})

const SearchBoxSchema = new mongoose.Schema({
    il :{
        type: String
    },
    ilce :{
        type: String
    },
    searc: {
        type: String ,  unique: true
    },
    ilmi : {type: Boolean, default: false},
    baglanti: {type: mongoose.Schema.Types.ObjectId, required: true},

})

module.exports = {
    'Konum': mongoose.model('Konum', KonumSchema),
    'Il': mongoose.model('Il', IlSchema),
    'Ilce': mongoose.model('Ilce', IlceSchema),
    'Mahalle': mongoose.model('Mahalle', MahalleSchema),
    'SearchBox' : mongoose.model('SearchBox', SearchBoxSchema),
}