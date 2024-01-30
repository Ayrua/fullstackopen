import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('error while logging in: ', exception.message)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = { author: author, title: title, url: url }
    console.log('adding new blog', newBlog)

    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setAuthor('')
      setUrl('')
      setTitle('')
    } catch (expection) {
      console.log('error while adding blog: ', exception.message)
    }

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const addBlogsForm = () => (
    <form onSubmit={handleAddBlog}>
      <p>Add a new Blog:</p>
      <div>
        title
        <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author
        <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url
        <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
      </div>

      <button type="submit">add</button>
    </form>
  )

  const blogList = () => {
    return (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      ))
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user === null ? 'please log in' : user.username + ' is logged in'}
        {user === null ? '' : logoutForm()}
      </div>
      {user === null ? null : addBlogsForm()}
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App