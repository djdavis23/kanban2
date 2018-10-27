var mongoose = require("mongoose")
var connectionString = "mongodb://guest:guest23@ds048537.mlab.com:48537/kanban2"
var connection = mongoose.connection

//, { useMongoClient: true } removed from connect call due to depracation
mongoose.connect(connectionString)

connection.on("error", err => {
  console.log("Database error: ", err)
})

connection.once("open", () => {
  console.log("Database connected!")
})


