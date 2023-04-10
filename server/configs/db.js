const mongoose = require('mongoose');
const config = require('./config');

exports.connect = async () => {
    await mongoose.connect(config.DATABASE_URL)
    try {
        console.log('Successfully connected To Database')
    } catch (error) {
        res.status(404).send({
            error: {
                message: error.message
            }
        })
        
    }
}