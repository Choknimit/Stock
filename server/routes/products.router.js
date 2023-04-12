const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

// http://localhost:5000/api/products
router.get('/', ProductController.prdAll)

router.post('/addprd', ProductController.addPrd)

router.get('/:id', ProductController.prdById)

router.delete('/delprd/:id', ProductController.delPrd)

// http://localhost:5000/api/products/updateprd/64368ab38f0f0247e339892e
router.put('/updateprd/:id', ProductController.UpdatePrd)



module.exports = router