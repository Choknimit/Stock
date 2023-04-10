const User = require('../models/user.model')


exports.userAll = async (req, res, next) => {
    try {
        const user = await User.find().sort({_id: -1})

        res.status(200).json({
            user: user
        })
    
        console.log(user)
    } catch (error) {
        res.status(404).json({
            error: {
                message: error.message
            }
        })
        
    }
}