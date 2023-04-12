const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prdname: { type: String, require: true },
    prdprice: { type: String, require: true },
    prdphoto: { type: String, require: true, default: 'nopic.png'},
    prddes: { type: String, },
}, {
    timestamps: true,
    collection: 'products',
})

const product = mongoose.model('Product', productSchema);

module.exports = product;