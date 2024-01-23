const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const sum = array.reduce((sum, val) => sum + val.likes, 0)
  // console.log(sum)
  return sum
}

const favoriteBlog = (array) => {
  const favorite = array.reduce((fav, val) => val.likes > fav.likes ? fav = val : fav)
  // console.log(favorite)
  return favorite
}

const mostBlogs = (array) => {
  const names = array.map(x => x.author)
  const name = (_.head(_(names).countBy().entries().maxBy(_.last)))
  const value = names.reduce((sum, val) => val === name ? sum + 1 : sum + 0, 0)
  // console.log(value)
  return ({ "author": name, "blogs": value })
}

const mostLikes = (array) => {
  const authors = array.map(x => x.author)
  const names = [...new Set(authors)]
  const mapped = names.map(x => ({ "author": x, "likes": 0 }))
  let maxAuthor = { "author": '', "likes": 0 }
  mapped.forEach((x, i) => {
    let name = x.author
    let likes = x.likes
    //console.log(name, likes)
    const sum = array.reduce((sum, val) => val.author === name ? sum + val.likes : sum + 0, 0)
    //console.log(name, sum)
    if (sum > maxAuthor.likes) {
      maxAuthor.author = name
      maxAuthor.likes = sum
    }
  })
  return maxAuthor
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}