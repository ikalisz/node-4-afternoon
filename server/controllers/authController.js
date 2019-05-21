const users = require('../models/users')
let id = 1
module.exports = {
    login: (req, res) => {
        const {username, password} = req.body
        if (username && password) {
            let loginUser = users.find(user => {
                console.log(user)
                return user.username === username && user.password === password
            })
            console.log(loginUser)
            if (loginUser) {
                console.log(req.session)
                console.log(req.session.cart)
                res.status(200).send(loginUser)
            } else {
                res.status(500).send(`i hate this`)
            }
        }
    },
    register: (req, res) => {
        const {username, password} = req.body
        if (username && password) {
            users.push({
                id,
                username,
                password,
            })
            id++
            req.session.user.username = username
            res.status(200).send(req.session.user)
        }
    },
    signout: (req, res) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    }
}