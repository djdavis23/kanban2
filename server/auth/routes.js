let router = require("express").Router()
let Users = require("../models/User")
let session = require("./session")

//initialize error
//don't let users know what failed
let loginError = new Error("Incorrect email or password")

