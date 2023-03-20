const mongoose = require('mongoose')
const schema = mongoose.Schema




const dbschema = new schema({
  name: String,
  email: String,
  password: String
})



module.exports = mongoose.model('userdata', dbschema)
