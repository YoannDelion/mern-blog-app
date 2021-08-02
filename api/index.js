const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const categoryRoutes = require('./routes/categories')

dotenv.config()
// Needed middleware to be able to use json
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(console.log('Connected to MongoDB'))
  .catch(error => console.log(error))

const storage = multer.diskStorage({
  destination: (req, fils, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name)
  }
})

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File uploaded')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoryRoutes)

app.listen('5000', () => {
  console.log('Server is running...')
})