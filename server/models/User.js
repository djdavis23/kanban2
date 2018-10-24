let mongoose = require("mongoose")
let Schema = mongoose.Schema
let schemaName = "User"

//configure bcrypt for password hashing
var bcrypt = require("bcryptjs");
const SALT = 10;

let schema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() }
})

//statics used to generate model methods
schema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
}


module.exports = mongoose.model(schemaName, schema)