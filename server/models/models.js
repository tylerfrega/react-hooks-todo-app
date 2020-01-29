const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure
const TaskSchema = new Schema(
  {
    title: String,
    completed: Boolean
  },
  { timestamps: true }
)

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Task', TaskSchema)
