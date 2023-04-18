const user = require('../models/user.model')
const User = require('../models/user.model')


exports.userAll = async (req, res, next) => {
    try {
        const user = await User.find().sort({_id: -1})

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
    const { name, email, password } = req.body
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