const swag = require('../models/swag')

module.exports = {
    read: (req, res, next) => {
        console.log('here')
        res.status(200).send(swag)
    }
}