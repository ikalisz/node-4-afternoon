require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const swag_ctrl = require('./controllers/swagController')
const auth_ctrl = require('./controllers/authController')
const cart_ctrl = require('./controllers/cartController')
const srch_ctrl = require('./controllers/searchController')
app.use(express.static(__dirname +'/../build'))
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.use(checkForSession)

app.get('/api/swag', swag_ctrl.read)
app.post('/api/login', auth_ctrl.login)
app.post('/api/register', auth_ctrl.register)
app.post('/api/signout', auth_ctrl.signout)
app.get('/api/user', auth_ctrl.getUser)
app.post('/api/cart/checkout', cart_ctrl.checkout)
app.post('/api/cart/:id', cart_ctrl.add)
app.delete('/api/cart/:id', cart_ctrl.delete)
app.get('/api/search', srch_ctrl.search)



app.listen(SERVER_PORT, () => {
    console.log(`working on port ${SERVER_PORT}`)
})