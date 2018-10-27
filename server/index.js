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

//connect to database
require("./db/db-config")

//configure middleware
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//designate files for public viewing
server.use(express.static(__dirname + '/../www/'))


//register auth routes - must register these before gatekeeper!
let auth = require("./auth/routes")
server.use(auth.session)
server.use(auth.router)

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
let listRoutes = require('./routes/lists')
let taskRoutes = require('./routes/tasks')
let commentRoutes = require('./routes/comments')

server.use('/api/boards', boardRoutes)
server.use('/api/lists', listRoutes)
server.use('/api/tasks', taskRoutes)
server.use('/api/comments', commentRoutes)

//catch all
server.use('/api/*', (error, req, res, next) => {
  res.status(400).send({ error: error ? error.message : "Bad Request" })
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