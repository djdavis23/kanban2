let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = "Task"



let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  listId: { type: ObjectId, reference: 'List', required: true },
  boardId: { type: ObjectId, reference: 'Board', required: true },
  userId: { type: ObjectId, reference: 'User', required: true },
  status: { type: String, required: true, default: "To-Do" },
  created: { type: Number, required: true, default: Date.now() }
})


module.exports = mongoose.model(schemaName, schema)