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
  // skipping empty array for now
  test('of multiple blog list', () => {
    const mostLiked = {
      author: "Robert C. Martin",
      blogs: 3
    }
    const result = listHelper.mostBlogs(listData.listWithMultipleBlogs)
    expect(result).toEqual(mostLiked)
  })

  test('of single blog list', () => {
    const mostLiked = {
      author: "Edsger W. Dijkstra",
      blogs: 1
    }
    const result = listHelper.mostBlogs(listData.listWithOneBlog)
    expect(result).toEqual(mostLiked)
  })

})

describe('most likes Blog', () => {
  // again skipping zero array
  test('of multiple blog list', () => {
    const mostLiked = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    const result = listHelper.mostLikes(listData.listWithMultipleBlogs)
    expect(result).toEqual(mostLiked)
  })

  test('of multiple blog list', () => {
    const mostLiked = {
      author: "Edsger W. Dijkstra",
      likes: 5
    }
    const result = listHelper.mostLikes(listData.listWithOneBlog)
    expect(result).toEqual(mostLiked)
  })

})