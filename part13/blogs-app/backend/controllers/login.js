const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET } = require('../util/config')
const router = require('express').Router()

const { User, Session } = require('../models')

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({
    where: {
      username: username
    }
  })

  if (user.disabled) {
    return response.status(400).json({
      error: 'user has been disabled'
    })
  }

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  const userId = user.id
  const session = await Session.create({userId, token})

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router