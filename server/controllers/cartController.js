const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        const {id} = req.params
        const {cart} = req.session.user
        if (id) {
            let indexCart = cart.findIndex(swagProduct => {
                return swagProduct.id === id
            })
            if (indexCart !== -1) {
                res.status(200).send(req.session.user)
            } else {
                let swagIndex = swag.findIndex(swagProduct => {
                    return swagProduct.id === +id
                })
                let swagAdd = {
                    ...swag[swagIndex]
                }
                cart.push(swagAdd)
                req.session.user.total += swagAdd.price
                res.status(200).send(req.session.user)
            }
        }
    },
    delete: (req, res) => {
        const {id} = req.params
        const {cart} = req.session.user
        if (id) {
            let deleteSwag = cart.findIndex(swagProduct => {
                return swagProduct.id === +id
            })
            req.session.user.total -= cart[deleteSwag].price
            req.session.user.cart.splice(deleteSwag, 1)
            res.status(200).send(req.session.user)
        }
    },
    checkout: (req, res) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).send(req.session.user)
    }
}