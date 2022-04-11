const router = require('express').Router()
const { sequelize, PageSettings } = require('../models')

router.get('/', async (req, res) => {
  try {
    const page = await PageSettings.findAll()
    res.json(page)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const post = await PageSettings.findOne({
      where: { id },
    })
    res.json(post)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.post('/create', async (req, res) => {
  try {
    const page = req.body
    const { pageName, pageDescription, seoTitle, seoDescription, content } = page
    await PageSettings.create({
      pageName,
      pageDescription,
      seoTitle,
      seoDescription,
      content,
    })
    res.json({ page })
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.put('/edit/:id', async (req, res) => {
  try {
    const page = req.body
    const { pageName, pageDescription, seoTitle, seoDescription, content } = page
    await PageSettings.update(
      {
        pageName,
        pageDescription,
        seoTitle,
        seoDescription,
        content,
      },
      { where: { id: req.params.id } }
    )
    res.json({ page })
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    await PageSettings.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.json(true)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
