const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./readingLists')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'users_saved' })

User.hasMany(Session)
Session.belongsTo(User)

// comment out below since using migrations
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User, ReadingLists, Session
}