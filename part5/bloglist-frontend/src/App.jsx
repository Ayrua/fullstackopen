import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

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

      setMessage(`Success logging in!`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    catch (exception) {
      console.log('error while logging in: ', exception.message)

      setMessage(`Wrong username or password!`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken(null)

    setMessage(`logged out!`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('adding new blog', blogObject)

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))

      setMessage(`Blog '${blog.title}' by '${blog.author}' was added!`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      console.log('error while adding blog: ', exception.message)

      setMessage(`There was an error adding the Blog`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
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

  const addBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef} >
      <BlogForm createBlog={handleAddBlog} />
    </Togglable>
  )


  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='message'>
        {message}
      </div>
    )
  }

  const blogList = () => {
    return (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      ))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user === null ? 'please log in' : user.username + ' is logged in'}
        {user === null ? '' : logoutForm()}
      </div>
      {user === null ? null : addBlogForm()}
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App