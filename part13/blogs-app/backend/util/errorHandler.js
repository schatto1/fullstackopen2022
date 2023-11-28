const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'something is missing in the request' })
  }

  if (error.name === 'TypeError') {
    return response.status(404).send({ error: 'resource does not exist' })
  }

  if (error.status === 400) {
    return response.status(400).send({ error: 'something is missing in the request' })
  }

  if (error.status === 404) {
    return response.status(404).send({ error: 'could not find the resource' })
  }

  next(error)
}

module.exports = errorHandler