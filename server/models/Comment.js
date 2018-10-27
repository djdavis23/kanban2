let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'

let schema = new Schema({
  content: { type: String, required: true },
  userId: { type: ObjectId, reference: 'User', required: true },
  userName: { type: String, required: true },
  taskId: { type: ObjectId, reference: 'Task', required: true },
  created: { type: Number, required: true, default: Date.now() }
})

module.exports = mongoose.model(schemaName, schema)