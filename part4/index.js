require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const PORT = config.PORT


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
