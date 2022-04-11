const express = require('express')
const { sequelize } = require('./models')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer  = require('multer')
const app = express()
const port = process.env.PORT || 4000
require('dotenv').config()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, paramerterLimit: 100000, limit: "500mb" }))

//Routes
//Auth
app.use('/auth', require('./routes/Auth'))

//Homes
app.use('/home', require('./routes/Home'))

//General Settings
app.use('/general-settings', require('./routes/GeneralSettings'))

//Blog Settings
app.use('/blog-settings', require('./routes/BlogSettings'))


//Server
app.listen(port, async () => {
  console.log(`Server started on port ${port}`)
  await sequelize.authenticate()
  console.log('Database Connected')
})
