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