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

//register auth routes - must register these before gatekeeper!
let auth = require("./auth/routes")
server.use(auth.session)
server.use(auth.routes)

//gatekeeper
server.use((req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: "Please login to continue"
    })
  }
  next()
})

//register api routes
let boardRoutes = require('./routes/boards')

server.use('/api/boards', boardRoutes)

//catch all
server.use('/api/*', (error, req, res, next) => {
  res.send({ error: error ? error.message : "Server Error" })
})

server.use("*", (req, res, next) => {
  res.status(404).send({
    error: "Resource not found"
  })
})

//listen for and report port opening
server.listen(port, () => {
  console.log("Server is running on port: ", port)
})