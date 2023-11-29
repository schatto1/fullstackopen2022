const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User } = require('../models')

// uses bcrypt to create passwordHash that is saved in database
router.post('/', async (req, res, next) => {
  const {username, name, password} = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({username, name, passwordHash})
  res.json(user)
})

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// username in param is used to find user, username in request body is used to update
router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router