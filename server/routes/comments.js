let router = require('express').Router()
let Comments = require('../models/Comment')

//get comments by task id
router.get('/by-task/:id', (req, res, next) => {
  Comments.find({ taskId: req.params.id })
    .then(comments => res.status(200).send(comments))
    .catch(next)
})

//create new comment
router.post('/', (req, res, next) => {
  Comments.create(req.body)
    .then(comment => res.status(201).send(comment))
    .catch(next)
})

//edit a comment
router.put('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      if (!comment.userId.equals(req.session.uid)) {
        return res.status(403).send("Not authorized to edit another user's comment")
      }
      comment.update(req.body, (err) => {
        if (err) {
          next(err)
          return
        }
        return res.status(200).send("Comment updated")
      })
    })
    .catch(next)
})

//delete comment
router.delete('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      if (!comment.userId.equals(req.session.uid)) {
        return res.status(403).send("Not authorized to delete another user's comment")
      }
      comment.remove(err => {
        if (err) {
          return res.send(err)
        }
        return res.status(204).send("Comment deleted")
      })
    })
    .catch(next)
})

//delete comments by task id
router.delete('/by-task/:id', (req, res, next) => {
  Comments.deleteMany({ taskId: req.params.id })
    .then(() => res.status(204).send("Comments deleted"))
    .catch(next)
})

module.exports = router