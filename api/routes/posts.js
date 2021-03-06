const router = require('express').Router()
const { verify } = require('../utils')
const Post = require('../models/Post')

// Create
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update
router.put('/:id', verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.username === req.user.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, { new: true })

        res.status(200).json(updatedPost)
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(401).json('You can only update your posts')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})


// Delete
router.delete('/:id', verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.username === req.user.username) {
      try {
        await post.delete()

        res.status(200).json('Post deleted')
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(401).json('You can only delete your posts')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get One
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get All
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let posts

    if (username) {
      posts = await Post.find({ username })
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName]
        }
      })
    } else {
      posts = await Post.find()
    }

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router