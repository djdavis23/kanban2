let mongoose = require('mongoose')
let Schema = mongoose.Schema
let schemaName = "Board"
let ObjectId = Schema.Types.ObjectId


let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: ObjectId, reference: 'User', required: true },
  created: { type: Number, required: true, default: Date.now() }
})





module.exports = mongoose.model(schemaName, schema)