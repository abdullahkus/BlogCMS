const router = require('express').Router()
const { sequelize, User } = require('../models')

const authorization = require('../middleware/authorizations')

router.get('/', authorization, async (req, res) => {
  try {
    //req.user has the payload
    res.json(req.user)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
