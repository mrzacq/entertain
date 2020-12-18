const express = require('express')
const app = express()
const port = 5000
const errHandler = require('./middlewares/errHandler')
require('./config/config')
const router = require('./router')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)
app.use(errHandler)

app.listen(port, () => console.log(`Movies ${port}`))