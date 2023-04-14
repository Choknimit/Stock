const PrdType = require('../models/prdType.model')
const Prd = require('../models/products.model')
const config = require('../configs/config')

exports.addPrd = async (req, res, next) => {
    try {
        const { prdname, prdprice, prdphoto, prddes, typePrd_id } = req.body
        let prd = new Prd({
            typePrd_id: typePrd_id,
            prdname: prdname,
            prdprice: prdprice,
            prdphoto: prdphoto,
            prddes: prddes,
    })
        await prd.save()
        res.status(200).json({
            message: 'Add Product Successfully'
        })
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'Add Product Failed'
            }
        })
        
    }
}

exports.getPrdAll = async (req, res, next) => {
    try {
        const prds = await Prd.find().populate('typePrd_id', ('Prdtype_name'))
        const prdPhotoDomain = await prds.map((prd) => {
            return {
                typePrd_id: prd.typePrd_id,
                id: prd._id,
                prdname: prd.prdname,
                prdprice: prd.prdprice,
                prdphoto: config.PHOTODOMAIN + prd.prdphoto,
                prddes: prd.prddes,
            }
        })
        res.status(200).json({
            Product: prdPhotoDomain
        })
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'Error get Product: ' + error.message
            }
        })
        
    }
}

exports.prdTypeAll = async (req, res, next) => {
    const prdsType = await PrdType.find()

    res.status(200).json({
        ProductType: prdsType
    })
}

exports.addprdType = async (req, res, next) => {
    try {
        const { Prdtype_name } = req.body
        
        let prdType = new PrdType({
            Prdtype_name: Prdtype_name,
        })

        await prdType.save()

        res.status(200).json({
            message: 'Add Prd Type Successfully'
        })

    } catch (error) {
        res.status(400).json({
            error: {
                message: 'Insert prdType failed' + error.message
            }
        })
        
    }
}

exports.getPrdwithtypePrd = async (req, res, next) => {
    try {
        const { id } = req.params
        const prds = await PrdType.findById(id).select('Prdtype_name').populate('products', ('prdname prdprice prdphoto prddes'))
        res.status(200).json({
            Data: prds
        })
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'Error: ' + error.message
            }
        })
        
    }
}

// exports.prdAll = async (req, res, next) => {
//     try {
//         // const prds = await Prd.find().populate('typeprd', ('Prdtype_name'))
//         const prds = await Prd.find()

//         const PrdPhotoDomain = await prds.map((prd) => {
//             return {
//                 id: prd._id,
//                 prdname: prd.prdname,
//                 prdprice: prd.prdprice,
//                 prdphoto: config.PHOTODOMAIN + prd.prdphoto,
//                 prddes: prd.prddes,
//                 typeprd: prd.typeprd
//             }
//         })

//         res.status(200).json({
//             Product: PrdPhotoDomain
//         })
        
//     } catch (error) {
//         res.status(400).json({
//             error: {
//                 message: 'Error: ' + error.message
//             }
//         })
        
//     }
// }
