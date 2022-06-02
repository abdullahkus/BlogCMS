const jwt_decode = require('jwt-decode')

const router = require('express').Router()
const { sequelize, User } = require('../models')
const validInfo = require('../middleware/validInfo')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const authorization = require('../middleware/authorizations')

//register
router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. req.body verisini çek (firstName, lastName, email, password)
    const { firstName, lastName,  email, password } = req.body
    // 2. kullanıcnın var olup olmadığının kontrolünü yap (varsa hata dönder)
    const user = await User.findOne({
      where: { email },
    })

    if (user !== null) {
      return res.status(401).json('Kullanıcı zaten var')
    }
    // //3. KUllanıcı parolasını Bcrypt ile şifrele
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, salt)
    // // //4. veritabanına ekleyin
    const haveUser = await User.findOne()
    if(haveUser){
      const newUser = await User.create({
        firstName,
        lastName,
        authority: 0,
        email,
        password: bcryptPassword,
      })
      // //5. jwt token oluştur.
      const token = jwtGenerator(newUser.user_id)
      res.json({ token })
    }
    else{
      const newUser = await User.create({
        firstName,
        lastName,
        authority: 1,
        email,
        password: bcryptPassword,
      })
      // //5. jwt token oluştur.
      const token = jwtGenerator(newUser.user_id)
      res.json({ token })
    }

  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

//login
router.post('/login', validInfo, async (req, res) => {
  try {
    //1. destructure the req.body

    const { email, password } = req.body

    //2. check if user doesn't exist (if not then we throw error)
    const user = await User.findOne({
      where: { email },
    })
    if (user === null) {
      return res.status(401).json('Şifre veya E-posta yanlış')
    }

    //3. check if incomming password is the same the database password

    const validPassword = await bcrypt.compare(
      password,
      user.dataValues.password
    )
    if (!validPassword) {
      return res.status(401).json('Şifre veya E-posta yanlış')
    }

    //4. give them the jwt token

    const token = jwtGenerator(user.dataValues.id)
    res.json({ token })
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/membership-verify', async (req, res) => {
  try {
    const jwtToken = req.header('token')
    const user_id = jwt_decode(jwtToken).user
    // console.log(user_id)
    const user = await User.findOne({
      where: { id: user_id },
    })
    if (user.authority === 1) {
      res.json(true)
    } else {
      res.json(false)
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
