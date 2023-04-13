const express = require('express');
const router = express.Router()
const productTypeController = require('../controllers/productType.controller')

router.get('/', productTypeController.prdTypeAll )

router.post('/addprdType', productTypeController.addprdType)

// router.get('/:id', productTypeController.prdTypeById)

router.get('/prd', productTypeController.prdAll)

router.get('/prd/:id', productTypeController.prdById)


module.exports = router