var express = require('express');
//  body สามารถใส่ชื่อฟิดล์เข้าไปด้านในได้
const { body } = require('express-validator')
var router = express.Router();
const userController = require('../controllers/user.controller')
/* GET users listing. */

router.get('/', userController.userAll)

router.get('/:id', userController.userById)

router.put('/upuser/:id', userController.UpdateUsers)

router.post('/register', [
    body('name').not().isEmpty().withMessage('กรุณากรอกข้อมูล'),
    body('email').not().isEmpty().withMessage('กรุณากรอกอีเมล์ด้วย').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    // ประกาศ password ไม่ให้มีค่าว่าง isLength ต้องมากว่า 5 ตัวขึ้นไป
    body('password').not().isEmpty().withMessage('กรุณากรอกพาสเวิส').isLength({ min: 5 }).withMessage('รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป')
], userController.registerUsers)



module.exports = router;
