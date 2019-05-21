require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const swag_ctrl = require('./controllers/swagController')


app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use(checkForSession)

app.get('/api/swag', swag_ctrl.read)


app.listen(SERVER_PORT, () => {
    console.log(`working`)
})