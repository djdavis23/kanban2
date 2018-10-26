let router = require('express').Router()
let Tasks = require('../models/Task')

//get tasks by list id
router.get('/by-list/:id', (req, res, next) => {
  Tasks.find({ listId: req.params.id })
    .then(tasks => res.send(tasks))
    .catch(next)
})

//create new task
router.post('/', (req, res, next) => {
  req.body.userId = req.session.uid
  Tasks.create(req.body)
    .then(task => res.send(task))
    .catch(next)
})

//update task

//delete a task


//delete all tasks beloning to a list

//add a comment

//delete a comment



module.exports = router;