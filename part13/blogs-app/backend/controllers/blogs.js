const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const router = require('express').Router()

const { Blog, User } = require('../models')

router.get('/', async (req, res, next) => {
  const blogs = await Blog.findAll()

  console.log(JSON.stringify(blogs))

  return res.json(blogs)
})

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.post('/', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id})
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