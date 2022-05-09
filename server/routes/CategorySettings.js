const router = require('express').Router()
const { sequelize, CategorySettings } = require('../models')

router.get('/', async (req, res) => {
  try {
    const category = await CategorySettings.findAll()
    res.json(category)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const post = await CategorySettings.findOne({
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
    const category = req.body
    const { name, title, description, seo_title, seo_description } = category
    await CategorySettings.create({
      name,
      title,
      description,
      seo_title,
      seo_description,
    })
    res.json({ category })
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.put('/edit/:id', async (req, res) => {
  try {
    const blog = req.body
    const { name, content, image, keywords, seo_title, seo_description } = blog
    await BlogSettings.update(
      {
        name,
        content,
        image,
        keywords,
        seo_title,
        seo_description,
      },
      { where: { id: req.params.id } }
    )
    res.json({ blog })
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    await BlogSettings.destroy({
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
