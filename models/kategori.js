const mongoose = require('mongoose')

const KategoriSchema = new mongoose.Schema({
    adi: {type: String, required: true},
    slug : {type: String, required: true},
})

module.exports = mongoose.model('Kategori', KategoriSchema)
