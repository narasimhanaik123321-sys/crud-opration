// const mongoose = require('mongoose')

// const StudentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number
// })

// module.exports = mongoose.model("Student", StudentSchema)



const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
})

module.exports = mongoose.model("Student", StudentSchema)
