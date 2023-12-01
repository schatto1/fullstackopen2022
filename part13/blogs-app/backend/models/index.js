const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

// comment out below since using migrations
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User
}