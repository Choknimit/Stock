const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    prdname: { type: String, require: true },
    prdprice: { type: String, require: true },
    prdphoto: { type: String, require: true, default: 'nopic.png'},
    prddes: { type: String, },
    typePrd_id: [{ type: Schema.Types.ObjectId, ref: 'ProductType' }] // การทำ Foreign Key 
}, {
    // timestamps: { createdAt: 'createdDate',updatedAt: 'updatedDate'},
    timestamps: true,
    collection: 'products',
})

const product = mongoose.model('Product', productSchema);

module.exports = product;