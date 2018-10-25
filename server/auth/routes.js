let router = require("express").Router()
let User = require("../models/User")
let session = require("./session")

//initialize error
//don't let users know what failed
let loginError = new Error("Incorrect email or password")

//create a new User
router.post('/auth/register', (req, res) => {
  //validate password length
  if (req.body.password.length < 6) {
    return res.status(401).send({ error: "Password must be at least 6 characters" })
  }

  //hash the password
  req.body.password = User.generateHash(req.body.password)

  //create new user
  User.create(req.body)
    .then(user => {
      //strip off password
      delete user._doc.password
      //set session user id
      req.session.uid = user._id
      //return user object to the client
      return res.send(user)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
})

//login existing user
router.post('/auth/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.status(401).send(loginError)
      }
      else if (!user.validatePassword(req.body.password)) {
        return res.status(401).send(loginError)
      }
      else {
        delete user._doc.password
        req.session.uid = user._id
        res.send(user)
      }
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

//validate user session
router.get('/auth/authenticate', (req, res) => {
  User.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(401).send({ error: "Please login to continue" })
      }
      delete user._doc.password
      res.send(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

//logoff user
router.delete('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send(err)
    }
    return res.send({ message: "Logout successful" })
  })
})


module.exports = { router, session }
