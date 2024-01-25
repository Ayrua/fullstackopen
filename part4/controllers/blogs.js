const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs).end()
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = request.token

  const user = await User.findById(body.userId)
  const blog = new Blog({
    'title': body.title,
    'author': body.author,
    'url': body.url,
    'likes': body.likes,
    'user': user.id
  })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  // const blog = new Blog(request.body)
  const body = request.body

  const result = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.status(201).json(result).end()
})

module.exports = blogsRouter