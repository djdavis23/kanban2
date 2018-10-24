//import and configure server
let express = require("express")
let server = express()
let port = 3000
let bp = require("body-parser")

//configure middleware
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))


//listen for and report port opening
server.listen(port, () => {
  console.log("Server is running on port: ", port)
})