const mongoose = require('mongoose');

const prdtypeSchema = new mongoose.Schema({
    Prdtype_name: { type: String, require: true },
    
}, {
    timestamps: true,
    collection: 'producttypes'
})

const prdtype = mongoose.model('ProductType', prdtypeSchema)

module.exports = prdtype