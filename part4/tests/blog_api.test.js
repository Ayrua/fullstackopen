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

test('check if blogs increase by one if added', async () => {
  const testBlog = new Blog({
    'title': 'test title',
    'author': 'test name',
    'url': 'test url',
    'likes': 0
  })
  const firstResponse = await api.get('/api/blogs')
  const firstLength = firstResponse.body.length

  const postResponse = await api.post('/api/blogs', testBlog)
  const postID = postResponse.body['id']

  const secondResponse = await api.get('/api/blogs')
  expect(secondResponse.body).toHaveLength(firstLength + 1)

  // check if id in database
  const thirdResponse = await api.get('/api/blogs')
  const checker = thirdResponse.body.some(x => x.id === postID)
  expect(checker).toBe(true)
})

afterAll(async () => {
  await mongoose.connection.close()
})