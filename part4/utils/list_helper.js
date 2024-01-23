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

module.exports = {
  dummy, totalLikes, favoriteBlog
}