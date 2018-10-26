let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = "Task"

let commentSchema = new Schema({
  userId: { type: ObjectId, reference: 'User', required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true }
})

let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  listId: { type: ObjectId, reference: 'List', required: true },
  boardId: { type: ObjectId, reference: 'Board', required: true },
  userId: { type: ObjectId, reference: 'User', required: true },
  status: { type: String, required: true, default: "To-Do" },
  comments: [commentSchema]
})


module.exports = mongoose.model(schemaName, schema)