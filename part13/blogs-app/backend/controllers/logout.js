const router = require('express').Router()

const { Session } = require('../models')

const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res, next) => {

  const authorization = req.get('authorization')
  
  const session = await Session.findOne({
    where: {
      token: authorization.substring(7)
    }
  })

  await session.destroy()
  return res.json(session)
})

module.exports = router