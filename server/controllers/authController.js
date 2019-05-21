const users = require('../models/users')
const id = 1
module.exports = {
    login: (req, res) => {
        const {username, password} = req.body
        if (username && password) {
            let loginUser = users.filter(user => {
                return user.username === username && user.password === password
            })
            res.status(200).send(loginUser)
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