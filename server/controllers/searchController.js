const swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        const {category} = req.query
        if (category) {
            if (
                category === 'hats' ||
                category === 'shirts' ||
                category === 'jackets' || 
                category === 'sweaters' ||
                category === 'pants' ||
                category === 'shorts'
            ) {
                let categoryFilter = swag.filter(swagProduct => {
                   return swagProduct.category === category
                })
                res.status(200).send(categoryFilter)
            } else {
                res.status(200).send(swag)
            }
        }
    }
}