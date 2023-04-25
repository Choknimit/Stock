const mongoose = require('mongoose');

const prdtypeSchema = new mongoose.Schema({
    prdTypeName: { type: String, required: true },
    // prd_id: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
    
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'producttypes'
})

// ? virtual จำลองข้อมูล ให้ลิงค์ไปที่ model Product เพื่อให้หาประเภทของสินค้าแล้วขึ้นสินค้าทั้งหมดในหมวดหมู่นั้นๆ
prdtypeSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',  // ? local fied คล้าย Primary key , _id Field ของ model นี้
    foreignField: 'typePrd_id' // ? typePrd_id คือ field ของ model Product ที่ทำชึ่นมา populate
})

const prdtype = mongoose.model('ProductType', prdtypeSchema)

module.exports = prdtype