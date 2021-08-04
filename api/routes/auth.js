const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass
    })

    const user = await newUser.save()

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    !user && res.status(400).json('Wrong credentials')

    const validated = await bcrypt.compare(req.body.password, user.password)
    !validated && res.status(400).json('Wrong credentials')

    const { password, ...others } = user._doc

    // Generate access token 
    const accessToken = jwt.sign({ id: user._id, username: user.username }, 'notSoSecretKey')

    res.status(200).json({ ...others, accessToken })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router