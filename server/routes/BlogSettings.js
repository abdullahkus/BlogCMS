const router = require('express').Router()
const { sequelize, BlogSettings } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blog = await BlogSettings.findAll()
    res.json(blog)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const post = await BlogSettings.findOne({
      where: { id },
    })
    res.json(post)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/category/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const post = await BlogSettings.findAll({
      where: { category: id },
    })
    res.json(post)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error')
  }
})

router.post('/create', async (req, res) => {
  try {
    const blog = req.body
    const { name, content, category, image, keywords, seo_title, seo_description } = blog
    await BlogSettings.create({
      name,
      content,
      category,
      image,
      keywords,
      seo_title,
      seo_description,
    })
    res.json({ blog })
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
        category,
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
