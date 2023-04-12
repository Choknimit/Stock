var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller')

/* GET users listing. */

router.get('/', userController.userAll)

router.put('/upuser/:id', userController.UpdateUsers)

module.exports = router;
