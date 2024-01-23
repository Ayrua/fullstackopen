const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const sum = array.reduce((sum, val) => sum + val.likes, 0)
  // console.log(sum)
  return sum
}

module.exports = {
  dummy, totalLikes
}