const express = require('express')
const router = express.Router()
const Task = require('../models/models')

// this is our get method
// this method fetches all available data in our database
router.get('/getTasks', (req, res) => {
  Task.find((err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, data: data })
  })
})

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body
  Data.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

router.post('/test', (req, res) => {
  req.body.forEach(task => {
    const { title, completed } = task
    task = new Task()
    task.title = title
    task.completed = completed
    task.save(err => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true })
    })
  })
})

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteTask', (req, res) => {
  const { id } = req.body
  Data.findByIdAndRemove(id, err => {
    if (err) return res.send(err)
    return res.json({ success: true })
  })
})

// this is our create methid
// this method adds new data in our database
router.post('/addTask', (req, res) => {
  let data = new Data()

  const { id, message } = req.body

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS'
    })
  }
  data.message = message
  data.id = id
  data.save(err => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

module.exports = router
