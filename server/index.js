//import and configure server
let express = require("express")
let server = express()
let port = 3000
let bp = require("body-parser")
let cors = require("cors")

//configure cors
var whitelist = ["http://localhost:8080"]
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhiteListed = whitelist.indexOf(origin) != -1
    callback(null, originIsWhiteListed)
  },
  credentials: true
}
server.use(cors(corsOptions))

//configure middleware
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//connect to database
require("./db/db-config")


//catch all
server.get("*", (req, res, next) => {
  res.status(400).send({
    error: "Resource not found"
  })
})

//listen for and report port opening
server.listen(port, () => {
  console.log("Server is running on port: ", port)
})