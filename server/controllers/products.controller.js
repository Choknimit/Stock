// const Prd = require('../models/products.model')
// const PrdType = require('../models/prdType.model')
// const config = require('../configs/config')

// exports.prdAll = async (req, res, next) => {
//     try {
//         const prd = await Prd.find().select('prdname prdprice prdphoto prddes').sort({_id: -1})

//         const prdphotoDomain = await prd.map((prdDomain, index) => {
//             return {
//                 id: prdDomain._id,
//                 prdname: prdDomain.prdname,
//                 prdprice: prdDomain.prdprice,
//                 prdphoto: config.PHOTODOMAIN + prdDomain.prdphoto,
//                 prddes: prdDomain.prddes
//             }
//         })
         
//         // console.log(prd)
//         res.status(200).json({
//             Product: prdphotoDomain
//         })
//     } catch (error) {
//         res.status(400).json({
//             error: {
//                 message: ('prdAll error: ' + error.message)
//             }
//         })
        
//     }
// }

// exports.addPrd = async (req, res, next) => {
//     try {
//         // ประกาศเลือกตัวแปรที่เราจะเอาไปทำการเก็บไว้
//         const { prdname, prdprice, prddescription } = req.body
        
//         //  เพิ่มข้อมูลทั้งหมดแบบไม่ต้องเลือก
//         const prd = new Prd(req.body);

//         //
//         // let prd = new Prd({
//         //     prdname: prdname,
//         //     prdprice: prdprice,
//         //     prddescription: prddescription
//         // })

//         await prd.save()
//         res.status(201).json({
//             message: ('Add Product Successfully')
//         })

//     } catch (error) {
//         res.status(400).json({
//             error: {
//                 message: ('Add Product failed: ' + error.message)
//             }
//         })
        
//     }
// }

// exports.prdById = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const prd = await Prd.findById(id)
    
//         res.status(200).json(prd)
//     } catch (error) {
//         res.status(400).json({
//             message: 'Find Product ById failed: ' + error.message
//         })
        
//     }
// }

// exports.delPrd = async (req, res, next) => {    
//     try {
//         const { id } = req.params
//         const prd = await Prd.deleteOne({ _id: id })

//         console.log(prd);

//         // deleteOne จะ return ค่า  deletedCount = number ถ้า deletedCount = 1 คือมีค่านั้นอยู่และทำการลบได้  ถ้า deletedCount = 0 คือไม่มีค่านั้นอยู่ให้ throw new Error ออกไป
//         if(prd.deletedCount === 0) {
//             throw new Error('This product does not exist in the system and cannot be deleted.')
//         }
//         res.status(200).json({
//             message: 'Delete Successfully'
//         })
        
//     } catch (error) {
//         res.status(400).json({
//             error: {
//                 message: 'Delete Failed: ' + error.message
//             }
//         })
        
//     }
// }

// // การ Update มี 2 วิธี วิธีที่ 1 คือการ find ขึ้นมาก่อน วิธีที่ 2 คือการใช้ updateOne or updateMany ********************************
// exports.UpdatePrd = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const { prdname, prdprice, prdphoto, prddes } = req.body
//         // ใช้ updateOne สามารถเช็ค modifieldCoutn ได้
//         // const prd = await Prd.updateOne({ _id: id }, {
//         //     prdname: prdname,
//         //     prdprice: prdprice,
//         //     prdphoto: prdphoto,
//         //     prddes: prddes
//         // })

//         const prd = await Prd.findByIdAndUpdate(id, {
//             prdname: prdname,
//             prdprice: prdprice,
//             prdphoto: prdphoto,
//             prddes: prddes
//         })


//         res.status(200).json({
//             message: 'Update Successfully'
//         })   

//     } catch (error) {
//         res.status(400).json({
//             error: {
//                 message: 'Update Failed: ' + error.message
//             }
//         })
        
//     }
// }


// // updateOne จะ return ค่า modifiedCount = number ถ้า modifiedCount = 1 คือค่ามีการเปลี่ยนแปลง ถ้า modifiedCount = 0 คือค่าไม่่มีการเปลี่ยนแปลง

// exports.prdTypeAll = async (req, res, next) => {
//     const prdType = await PrdType.find()
//     res.status(200).json({
//         ProductType: prdType
//     })
// }

