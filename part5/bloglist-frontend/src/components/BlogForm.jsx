import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setUrl('')
    setTitle('')
  }

  return (
    <div>
      <p>Add new Blog:</p>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            placeholder='write blog title here'
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            placeholder='write blog author here'
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            placeholder='write blog url here'
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm