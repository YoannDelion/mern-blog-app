const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: false
    }
  },
  // createdAt and updatedAt fields
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)