const router = require('express').Router()

const { ReadingLists, User } = require('../models')
const sequelize = require('sequelize')

const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res, next) => {
  const readingLists = await ReadingLists.findAll({
    
  })
  res.json(readingLists)
})

router.post('/', async (req, res, next) => {
  const {blogId, userId} = req.body

  const reading = await ReadingLists.create({userId, blogId})
  res.json(reading)
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)

  const reading = await ReadingLists.findByPk(req.params.id)

  if (user.id !== reading.userId) {
    return res.status(401).json({
      error: 'you must be the user to mark as read'
    })
  }

  reading.read = req.body.read
  await reading.save()
  return res.json(reading)
})

module.exports = router