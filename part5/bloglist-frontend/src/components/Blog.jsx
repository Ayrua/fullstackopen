import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const username = () => {
    if (blog.user && blog.user.name) return blog.user.name
    return null
  }


  return (
    <div className='container'>
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
          <p>likes {blog.likes} <button>like</button></p>
          <p>{username()}</p>
        </div>
      </div>
    </div>
  )
}

export default Blog