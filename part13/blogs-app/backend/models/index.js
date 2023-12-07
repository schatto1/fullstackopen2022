const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'saved_blogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_saved' })

// comment out below since using migrations
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User
}