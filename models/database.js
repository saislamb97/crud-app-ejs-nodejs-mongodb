const mongoose = require('mongoose')
const schema = mongoose.Schema
require('dotenv/config')
const dburl = process.env.DATABASE_URL

mongoose.connect(dburl)

const dbschema = new schema({
  name: String,
  email: String,
  password: String
})

module.exports = mongoose.model('userdata', dbschema)
