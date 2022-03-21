const router = require('express').Router()
const { sequelize, GeneralSettings } = require('../models')

router.put('/', async (req, res) => {
  try {
    //req.user has the payload
    const general = req.body
    const {
      logo,
      favicon,
      title,
      description,
      seo_title,
      seo_description,
    } = general
    //ayar var mı yok mu
    const haveGeneral = await GeneralSettings.findOne({
      where: { id: 1 },
    })
    if (haveGeneral) {
      await GeneralSettings.update(
        {
          logo,
          favicon,
          title,
          description,
          seo_title,
          seo_description,
        },
        { where: { id: 1 } }
      )
    } else {
      await GeneralSettings.create({
        id: 1,
        logo,
        favicon,
        title,
        description,
        seo_title,
        seo_description,
      })
    }

    res.json({ general })
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
