const BlogForm = ({
  handleAddBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <p>Add new Blog:</p>
      <form onSubmit={handleAddBlog}>
        <div>
          title
          <input type="text" value={title} name="Title" onChange={handleTitleChange} />
        </div>
        <div>
          author
          <input type="text" value={author} name="Author" onChange={handleAuthorChange} />
        </div>
        <div>
          url
          <input type="text" value={url} name="Url" onChange={handleUrlChange} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm