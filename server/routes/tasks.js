let router = require('express').Router()
let Tasks = require('../models/Task')

//get tasks by list id
router.get('/by-list/:id', (req, res, next) => {
  Tasks.find({ listId: req.params.id })
    .then(tasks => res.status(200).send(tasks))
    .catch(next)
})

//create new task
router.post('/', (req, res, next) => {
  req.body.userId = req.session.uid
  Tasks.create(req.body)
    .then(task => res.status(201).send(task))
    .catch(next)
})

//update task 
router.put('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      if (!task.userId.equals(req.session.uid)) {
        return res.status(403).send("Not authorized to edit another user's task")
      }
      task.update(req.body, (err) => {
        if (err) {
          next(err)
          return
        }
        return res.status(200).send("Task updated")
      })
    })
    .catch(next)
})

//delete a task
router.delete('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      if (!task.userId.equals(req.session.uid)) {
        return res.status(403).send("Not authorized to delete another user's task")
      }
      task.remove(err => {
        if (err) {
          return res.send(err)
        }
        return res.status(204)
      })
    })
    .catch(next)
})

//delete all tasks beloning to a list
router.delete('/by-list/:id', (req, res, next) => {
  Tasks.deleteMany({ listId: req.params.id })
    .then(() => res.status(204))
    .catch(next)
})


module.exports = router;