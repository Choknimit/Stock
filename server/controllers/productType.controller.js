const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid')
const { promisify } = require('util')
// ? ใช้ fs.writeFile อันนี้แปลง writefile ให้เป็น promisify โดยใช้ module util เพราะจะทำให้ใช้ async await ได้
const writeFileAsync = promisify(fs.writeFile) 

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
            prdphoto: await saveImageToDisk(prdphoto),
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

async function saveImageToDisk(baseImage) { // baseImage คือ data:image/jpeg;base64,/9j/4AAQSkZJ... อันนี้ทั้งหมด
    // หา path ของโปรเจค
    const projectPath = path.resolve('./')
    // โฟลเดอร์และ path ของการ upload
    const uploadPath = `${projectPath}/public/images/`

    // หานามสกุลไฟล์
    // data:image/jpeg;base64,/9j/4AAQSkZJ... ไฟล์ที่ front-end ส่งมาจะเป็น base64 จะเป็นแบบนี้เลยต้องทำการ substring เพื่อเอานามสกุลไฟล์ที่เป็น png jpg svg
    const ext = baseImage.substring(baseImage.indexOf('/')+1, baseImage.indexOf(";base64"))
    // substring เสร็จให้ทำการสุ่มชื่อไฟล์ไหม่แต่นามสกุลไฟล์เดิม

    // สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = ''
    if(ext === 'svg+xml') {
        filename = `${uuidv4.v4().svg}`
    } else {
        filename = `${uuidv4.v4()}.${ext}`
    }

    // Extract base64 data ออกมา ก็คือข้อมูลที่อยู่ข้างหลังตัว base64,/ data:image/jpeg;base64,/9j/4AAQSkZJ...
    let image = decodeBase64Image(baseImage)

    // ? เมื่อได้ image มาแล้ว ให้ image.data data มาจาก function decodeBase64Image ตรง Image.data = matches[2] เอา stringbinary มาเขียนไฟล์ไปไว้ที่ path 
    // เขียนไฟล์ไปไว้ที่ Path
    await writeFileAsync(uploadPath+filename, image.data, 'base64')
    // return ชื่อไฟล์ทั้งหมดออกไป
    return filename
}

function decodeBase64Image(base64Str) {
    // ? ใช้หลักการ Regular Expressions โดยตัวแรกdata:ใช้หานามสกุล ตัวที่สองbase64: ใช้หาข้อมูลที่อยู่หลัง data:image/jpeg;base64,/9j/4AAQSkZJ... <-- ตัวนี้ที่หา 
    let matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let image = {};
    if (!matches || matches.length != 3) {
        throw new Error('Invalid base64 string')
    } 

    image.type = matches[1]
    image.data = matches[2]

    return image;

}