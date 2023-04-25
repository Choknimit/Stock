const express = require('express');
const router = express.Router()
const productTypeController = require('../controllers/productType.controller')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'file-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length-1])}
    })

const upload = multer({ storage: storage }).single('prdphoto')

router.get('/', productTypeController.prdTypeAll)

router.get('/prd', productTypeController.getPrdAll)

router.post('/addprdType', productTypeController.addprdType)

router.post('/addPrd', upload,  productTypeController.addPrd)

router.get('/PrdwithTypePrd/:id', productTypeController.getPrdwithtypePrd)



module.exports = router