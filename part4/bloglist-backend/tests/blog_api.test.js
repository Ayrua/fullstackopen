const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listData = require('./listData')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialData = listData.listWithMultipleBlogs


let auth_token = null

// initializing dataset with list of 6
beforeEach(async () => {
  await Blog.deleteMany({})
  for (const x of initialData) {
    let blogObject = new Blog(x)
    await blogObject.save()
  }

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

  const newUser = {
    "username": "usertest",
    "name": "test",
    "password": "12345678"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const loginResult = await api
    .post('/api/login')
    .send(newUser)

  auth_token = {
    'Authorization': `Bearer ${loginResult.body.token}`
  }
})

describe('get requests tests', () => {
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
})

describe('post request tests', () => {
  test('check if blogs increase by one if added', async () => {
    const testBlog = {
      'title': 'test title',
      'author': 'test name',
      'url': 'test url',
      'likes': 0
    }
    const firstResponse = await api.get('/api/blogs')
    const firstLength = firstResponse.body.length

    const postResponse = await api
      .post('/api/blogs')
      .send(testBlog)
      .set(auth_token)
      .expect(201)
    const postID = postResponse.body['id']

    const secondResponse = await api.get('/api/blogs')
    expect(secondResponse.body).toHaveLength(firstLength + 1)

    // check if id in database
    const thirdResponse = await api.get('/api/blogs')
    const checker = thirdResponse.body.some(x => x.id === postID)
    expect(checker).toBe(true)
  })
})

describe('schema tests', () => {
  test('check if blogs created without likes, have 0', async () => {
    const testBlog = {
      'title': 'test title 2',
      'author': 'test name 2',
      'url': 'test url 2',
    }
    const postResponse = await api.post('/api/blogs').send(testBlog).set(auth_token)
    const postID = postResponse.body['id']

    const getResponse = await api.get('/api/blogs')
    const blogObject = getResponse.body.find(x => x.id === postID)
    // console.log(blogObject)
    expect(blogObject.likes).toBe(0)
  })

  test('check if blogs created without title return 400', async () => {
    const testBlog = {
      // 'title': 'test title 3',
      'author': 'test name 3',
      'url': 'test url 3',
    }
    await api.post('/api/blogs').send(testBlog).set(auth_token).expect(400)
  })

  test('check if blogs created without url return 400', async () => {
    const testBlog = {
      'title': 'test title 4',
      'author': 'test name 4',
      // 'url': 'test url 4',
    }
    await api.post('/api/blogs').send(testBlog).set(auth_token).expect(400)
  })
})

describe('modification request test', () => {
  test('check if blogs are deleted by id', async () => {
    const testBlog = {
      'title': 'test title 5',
      'author': 'test name 5',
      'url': 'test url 5',
    }
    const response = await api.post('/api/blogs').send(testBlog).set(auth_token)
    const postID = response.body['id']
    //console.log(response.body)
    //console.log(postID)

    await api.delete(`/api/blogs/${postID}`).set(auth_token).expect(204)
  })

  test('check if blogs likes change by id', async () => {
    const testBlog = {
      'title': 'test title 6',
      'author': 'test name 6',
      'url': 'test url 6',
      'likes': 10
    }
    const newLikes = { 'likes': 333 }
    const response = await api.post('/api/blogs').send(testBlog).set(auth_token)
    const postID = response.body['id']

    await api.put(`/api/blogs/${postID}`).send(newLikes)

    const getResponse = await api.get('/api/blogs')
    const blogObject = getResponse.body.find(x => x.id === postID)

    expect(blogObject.likes).toBe(333)
  })
})

describe('user login and modification tests', () => {
  test('check if blog is deleteable by user who posted', async () => {
    const testBlog = {
      "title": "Test delete",
      "author": "Mr. Test delete",
      "url": "test.test.com",
    }

    const postResponse = await api.post('/api/blogs').send(testBlog).set(auth_token)
    //console.log(postResponse.body)
    await api
      .delete(`/api/blogs/${postResponse.body.id}`)
      .set(auth_token)
      .expect(204)
  })

  test('check if blog is deleteable by user who didnt post', async () => {
    await api
      .delete(`/api/blogs/5a422ba71b54a676234d17fb`)
      .set(auth_token)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})