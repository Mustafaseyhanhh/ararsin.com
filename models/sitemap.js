const mongoose = require('mongoose')

const SitemapUrlSchema = new mongoose.Schema({
    loc: {type: String, required: true, unique: true},
    priority : {type: Number, required: true},
    lastmod: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Sitemapurl', SitemapUrlSchema)
