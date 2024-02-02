import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  return (
    <div className='container'>
      <div style={hideWhenVisible}>
        {blog.title}
        <> </>
        <button onClick={() => setVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}
        <> </>
        <button onClick={() => setVisible(false)}>hide</button>
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.author}</p>
        </div>
      </div>
    </div>
  )
}

export default Blog