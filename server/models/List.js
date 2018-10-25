let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = "List"

let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: ObjectId, reference: 'User', required: true },
  boardId: { type: ObjectId, reference: 'Board', required: true },
  created: { type: Number, required: true, default: Date.now() }
})

module.exports = mongoose.model(schemaName, schema)