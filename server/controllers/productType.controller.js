const PrdType = require('../models/prdType.model')
const Prd = require('../models/products.model')
const config = require('../configs/config')

exports.prdTypeAll = async (req, res, next) => {
    const prdType = await PrdType.find().select('Prdtype_name').sort({ _id: -1})

    res.status(200).json({
        ProductType: prdType
    })
}

exports.addprdType = async (req, res, next) => {
    try {
        const prdType = new PrdType(req.body)
        await prdType.save()
        res.status(200).json('Insert Successfully')
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'Insert prdType failed' + error.message
            }
        })
        
    }
}

// exports.prdTypeById = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const prdType = await PrdType.findById({ _id: id})
//         res.status(200).json(prdType)
//     } catch (error) {
//         res.status(400).json({
//             error: {
//                 message: 'Find ById Error: ' + error.message
//             }
//         })
        
//     }
// }

exports.prdAll = async (req, res, next) => {
    try {
        const prds = await Prd.find().populate('typeprd')

        const PrdPhotoDomain = await prds.map((prd) => {
            return {
                id: prd._id,
                prdname: prd.prdname,
                prdprice: prd.prdprice,
                prdphoto: config.PHOTODOMAIN + prd.prdphoto,
                prddes: prd.prddes,
                typeprd: prd.typeprd
            }
        })

        res.status(200).json({
            Product: PrdPhotoDomain
        })
        
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'Error: ' + error.message
            }
        })
        
    }
}

exports.prdById = async (req, res, next) => {
    const { id } = req.params
    const prd = await Prd.findById({ _id: id})

    res.status(200).json(prd)
}