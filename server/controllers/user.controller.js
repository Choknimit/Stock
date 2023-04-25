const { compare } = require('bcryptjs')
const User = require('../models/user.model')
// const { validation } = require('')


exports.userAll = async (req, res, next) => {
    try {
        const user = await User.find().sort({_id: -1})
        console.log(user)

        res.status(200).json({
            user: user
        })
    
        // console.log(user)
    } catch (error) {
        res.status(404).json({
            error: {
                message: error.message
            }
        })
        
    }
}

exports.userById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById({_id: id})
        console.log(user)
        res.status(200).json(user)
        
        
    } catch (error) {
        res.status(400).json({
            error: {
                status_code: 400,
                message: 'User by id not found'
            }
        })
        
    }
}

exports.UpdateUsers = async (req, res, next) => {
    const { id } = req.params
    const { name, email, password } = req.body

    const user = await User.updateOne({ _id: id}, {
        name: name,
        email: email,
        password: password
    })

    console.log(user);

    res.status(200).json(user)
}

exports.registerUsers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        // เข็ค email ซ้ำ email ด้านซ้าย field จากฐานข้อมูล ด้านขวาคือที่รับมาจาก body เอามาเปรียบเทียบกันถ้ามีก็จะเอามาเก็บไว้ในตัวแปร
        const checkEmail = await User.findOne({email: email})
        console.log(checkEmail)
        // ถ้ามี email ให้ return message ออกไป
        if(checkEmail) {
            const error = new Error('Duplicate email, please use a new email.')
            error.statusCode = 400
            throw error
        } else {
            let user = new User();
            user.name = name;
            user.email = email;
            // ก่อนทำการ save password ต้องทำการ hash ก่อนเพื่อความปลอดภัย
            user.password = await user.encryptPassword(password) // เอา password ที่รับมาโยนใส่ cunstom function เพื่อให้ไปทำการ hash and genSalt
            await user.save()
            // console.log(user)
            res.status(200).json({
                message: 'Register Successfully'
            })
        }
    } catch (error) {
        next(error)
        
    }
    
}