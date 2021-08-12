import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedinUser = useSelector(state => state.login.user)
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
    dispatch(addLike(blog))
    dispatch(setNotification(`Existing blog ${blog.title} by ${blog.author} updated`))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} bt ${blog.user.name}?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotification(`Blog ${blog.title} by ${blog.author} deleted`))
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <span className="blog-title">{blog.title}</span> {blog.author}
        <button className="blog-details-toggle" onClick={() => setVisible(!visible)}>{toggleButtonText}</button>
        {visible &&
          <div className="blog-details">
            {blog.url}<br />
            <span className="blog-details-likes-count">{blog.likes}</span> <button onClick={handleLike}>Like</button><br />
            {blog.user.name}<br />
            {(loggedinUser && loggedinUser.username === blog.user.username) && <button onClick={handleRemove}>remove</button>}
          </div>
        }
      </div>
    </div>
  )
}

export default Blog
