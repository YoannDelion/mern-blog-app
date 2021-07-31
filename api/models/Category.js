const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  // createdAt and updatedAt fields
  { timestamps: true }
)

module.exports = mongoose.model('Category', CategorySchema)