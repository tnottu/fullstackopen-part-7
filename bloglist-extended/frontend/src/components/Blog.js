import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleButtonText = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updatedBlog = Object.assign({}, blog, {
      likes: blog.likes + 1,
    })
    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} bt ${blog.user.name}?`)) {
      removeBlog(blog)
    }
  }

  /*
  const updateBlog = async (updatedBlog) => {
    const returnedBlog = await blogService.update(updatedBlog)
    setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
    dispatch(setNotification(`Existing blog ${returnedBlog.title} by ${returnedBlog.author} updated`))
  }
  */

  /*
  const removeBlog = async (blogToRemove) => {
    await blogService.remove(blogToRemove)
    setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    dispatch(setNotification(`Blog ${blogToRemove.title} by ${blogToRemove.author} deleted`))
  }
  */

  return (
    <div style={blogStyle} className="blog">
      <div>
        <span className="blog-title">{blog.title}</span> {blog.author}
        <button className="blog-details-toggle" onClick={() => setVisible(!visible)}>{toggleButtonText}</button>
        {visible &&
          <div className="blog-details">
            {blog.url}<br />
            <span className="blog-details-likes-count">{blog.likes}</span> <button disabled onClick={handleLike}>Like</button><br />
            {blog.user.name}<br />
            {(user && user.username === blog.user.username) && <button disabled onClick={handleRemove}>remove</button>}
          </div>
        }
      </div>
    </div>
  )
}

export default Blog
