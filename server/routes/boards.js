let router = require('express').Router()
let Boards = require("../models/Board")

//GET ALL BOARDS FOR THE CURRENT USER
router.get("/", (req, res, next) => {
  Boards.find({ author: req.session.uid })
    .then(boards => {
      return res.status(200).send(boards)
    })
    .catch(next)
})

//GET BOARD BY ID
router.get('/:boardId', (req, res, next) => {
  Boards.findById(req.params.boardId)
    .then(board => {
      return res.status(200).send(board)
    })
    .catch(next)
})

//POST A NEW BOARD
router.post('/', (req, res, next) => {
  req.body.author = req.session.uid
  Boards.create(req.body)
    .then(board => {
      return res.status(201).send(board)
    })
    .catch(next)
})


//PUT
router.put('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.author.equals(req.session.uid)) {
        return res.status(403).send("Not authorized to update another user's board")
      }
      board.update(req.body, (err) => {
        if (err) {
          next(err)
          return
        }
        res.status(200).send("Board Updated")
      })
    })
    .catch(next)
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.author.equals(req.session.uid)) {
        return res.status(403).send("Not authorized to delete another user's board")
      }
      board.remove(err => {
        if (err) {
          next(err)
          return
        }
        return res.status(204).send()
      })
    })
    .catch(next)
})


module.exports = router