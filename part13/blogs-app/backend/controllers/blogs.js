const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
  const blogs = await Blog.findAll()

  console.log(JSON.stringify(blogs))

  return res.json(blogs)
})

router.post('/', async (req, res, next) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/:id', blogFinder, async (req, res, next) => {
  return res.json(req.blog)
})

router.delete('/:id', blogFinder, async (req, res, next) => {
  await req.blog.destroy()
  return res.json(req.blog)
})

router.put('/:id', blogFinder, async (req, res, next) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  return res.json(req.blog)
})

module.exports = router