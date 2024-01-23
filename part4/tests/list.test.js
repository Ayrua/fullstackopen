const listHelper = require('../utils/list_helper')
const listData = require('./listData')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listData.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listData.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has only one blog, and that one item has 0 likes', () => {
    const result = listHelper.totalLikes(listData.listWithOneBlogZeroLikes)
    expect(result).toBe(0)
  })

  test('of a bigger list is calcualted right', () => {
    const result = listHelper.totalLikes(listData.listWithMultipleBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite Blog', () => {

  test('of multiple blog list', () => {
    const mostLiked = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
    const result = listHelper.favoriteBlog(listData.listWithMultipleBlogs)
    expect(result).toEqual(mostLiked)
  })

  test('of single blog list', () => {
    const mostLiked = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
    const result = listHelper.favoriteBlog(listData.listWithOneBlog)
    expect(result).toEqual(mostLiked)
  })

  test('of single blog list with zero Likes', () => {
    const mostLiked = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    }
    const result = listHelper.favoriteBlog(listData.listWithOneBlogZeroLikes)
    expect(result).toEqual(mostLiked)
  })

})