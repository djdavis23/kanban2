let router = require("express").Router()
let Lists = require("../models/List")

//get lists by board id
router.get('/by-board/:id', (req, res, next) => {
  Lists.find({ boardId: req.params.id })
    .then(lists => res.send(lists))
    .catch(next)
})

//post new list
router.post('/', (req, res, next) => {
  req.body.author = req.session.uid
  Lists.create(req.body)
    .then(list => res.send(list))
    .catch(next)
})

//update a list
router.put('/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(list => {
      if (!list) {
        return res.status(404).send("List not found")
      }
      if (!list.author.equals(req.session.uid)) {
        return res.status(401).send("Cannot update another user's list")
      }
      list.update(req.body, (err) => {
        if (err) {
          next(err)
          return
        }
        return res.send("List updated")
      })
    })
    .catch(next)
})

//delete a list
router.delete('/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(list => {
      if (!list.author.equals(req.session.uid)) {
        return res.status(401).send("Cannot delete another user's list")
      }
      list.remove(err => {
        if (err) {
          return res.send(err)
        }
        return res.send("List deleted")
      })
    })
    .catch(next)
})

//delete all lists by board-id
router.delete('/by-board/:id', (req, res, next) => {
  Lists.deleteMany({ boardId: req.params.id })
    .then(() => res.send("Lists deleted"))
    .catch(next)
})

module.exports = router