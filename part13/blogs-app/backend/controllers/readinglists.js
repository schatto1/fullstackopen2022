const router = require('express').Router()

const { ReadingLists } = require('../models')
const sequelize = require('sequelize')

router.post('/', async (req, res, next) => {
  const {blogId, userId} = req.body

  const reading = await ReadingLists.create({userId, blogId})
  res.json(reading)
})

module.exports = router