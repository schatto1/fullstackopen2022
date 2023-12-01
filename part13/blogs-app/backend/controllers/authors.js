const router = require('express').Router()

const { User, Blog } = require('../models')
const sequelize = require('sequelize')

router.get('/', async (req, res, next) => {

  const order = [
    ['likes', 'DESC']
  ]

  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    order,
    group: 'author'
  })
  return res.json(blogs)
})

module.exports = router