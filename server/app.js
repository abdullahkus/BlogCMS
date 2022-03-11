const express = require('express')
const { sequelize } = require('./models')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
require('dotenv').config()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Routes
//Auth
app.use('/auth', require('./routes/Auth'))

//Home
app.use('/home', require('./routes/Home'))

//Server
app.listen(port, async () => {
  console.log(`Server started on port ${port}`)
  await sequelize.authenticate()
  console.log('Database Connected')
})
