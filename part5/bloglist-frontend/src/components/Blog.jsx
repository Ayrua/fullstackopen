import { useState } from 'react'

const Blog = ({ blog, user, handleLikes, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const username = () => {
    if (blog.user && blog.user.name) return blog.user.name
    return null
  }

  const addLikes = () => {
    const putReq = {
      likes: blog.likes + 1,
    }

    handleLikes(blog.id, putReq)
  }

  const deleteBlog = () => {
    handleDelete(blog)
  }

  const DeleteButton = () => {
    // console.log(blog.user && blog.user.username === user.username)
    if (blog.user && (blog.user.username === user.username)) {
      return (
        <button id='deleteButton' onClick={() => deleteBlog()}>delete</button>
      )
    }
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <> </>
        <button onClick={() => setVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <> </>
        <button onClick={() => setVisible(false)}>hide</button>
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button id='likeButton' onClick={() => addLikes()}>like</button></p>
          <p>{username()}</p>
          <DeleteButton />
        </div>
      </div>
    </div>
  )
}

export default Blog