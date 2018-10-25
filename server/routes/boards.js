let router = require('express').Router()
let Boards = require("../models/Board")

//GET ALL BOARDS FOR THE CURRENT USER
router.get("/", (req, res, next) => {
  Boards.find({ author: req.session.uid })
    .then(boards => {
      return res.send(boards)
    })
    .catch(next)
})

//POST A NEW BOARD
router.post('/', (req, res, next) => {
  req.body.author = req.session.uid
  Boards.create(req.body)
    .then(board => {
      return res.send(board)
    })
    .catch(next)
})


//PUT
router.put('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.author.equals(req.session.uid)) {
        return res.status(401).send("Not authorized to update another user's board")
      }
      board.update(req.body, (err) => {
        if (err) {
          next()
          return
        }
        res.send("Board Updated")
      })
    })
    .catch(next)
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.author.equals(req.session.uid)) {
        return res.status(401).send("Not authorized to delete another user's board")
      }
      board.remove(err => {
        if (err) {
          next()
          return
        }
        return res.send("Board Deleted")
      })
    })
    .catch(next)
})


module.exports = router