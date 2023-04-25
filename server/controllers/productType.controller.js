const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid')
const { promisify } = require('util')
// ? ใช้ fs.writeFile อันนี้แปลง writefile ให้เป็น promisify โดยใช้ module util เพราะจะทำให้ใช้ async await ได้
const writeFileAsync = promisify(fs.writeFile) 
const multer = require('multer')

const PrdType = require('../models/prdType.model')
const Prd = require('../models/products.model')
const config = require('../configs/config')


exports.addPrd = async (req, res, next) => {
    let prd = new Prd({
        typePrd_id: req.body.typePrd_id,
        prdname: req.body.prdname,
        prdprice: req.body.prdprice,
        prddes: req.body.prddes,
    })
    if(req.file) {
        prd.prdphoto = req.file.filename
    } else {
        prd.prdphoto = 'nopic.png'
    }
    await prd.save()
    console.log(prd)
    res.status(200).json('successfully')
}


exports.getPrdAll = async (req, res, next) => {
    try {
        const prds = await Prd.find().populate('typePrd_id', ('prdTypeName'))
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
            products: prdPhotoDomain
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
