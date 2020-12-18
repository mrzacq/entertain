const express = require('express')
const app = express()
const port = 5000
const router = require('./router')
const cors = require('cors')
const errHandler = require('./middlewares/errHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)
app.use(errHandler)

app.listen(port, () => console.log(`Orchestrator ${port}`))