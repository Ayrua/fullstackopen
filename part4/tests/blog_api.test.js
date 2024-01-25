const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listData = require('./listData')

const initialData = listData.listWithMultipleBlogs

// initializing dataset with list of 6
beforeEach(async () => {
  await Blog.deleteMany({})
  for (const x of initialData) {
    let blogObject = new Blog(x)
    await blogObject.save()
  }
})


test('correct length of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(6)
})

test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]
  // console.log(firstBlog)
  expect(firstBlog['id']).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close()
})