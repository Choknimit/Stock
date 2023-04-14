const express = require('express');
const router = express.Router()
const productTypeController = require('../controllers/productType.controller')

router.get('/', productTypeController.prdTypeAll)

router.get('/prd', productTypeController.getPrdAll)

router.post('/addprdType', productTypeController.addprdType)

router.post('/addPrd', productTypeController.addPrd)

router.get('/PrdwithTypePrd/:id', productTypeController.getPrdwithtypePrd)






module.exports = router