import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import {
  useHistory,
} from 'react-router-dom'

const Blog = ({ blog }) => {

  if (!blog) {
    return (
      <p>Blog not found</p>
    )
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const loggedinUser = useSelector(state => state.login.user)

  const handleLike = () => {
    dispatch(addLike(blog))
    dispatch(setNotification(`Existing blog ${blog.title} by ${blog.author} updated`))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user.name}?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotification(`Blog ${blog.title} by ${blog.author} deleted`))
      history.push('/')
    }
  }

  return (
    <article>
      <h2>{blog.title}, {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      <span>{blog.likes}</span> <button onClick={handleLike}>Like</button><br />
      added by {blog.user.name}<br />
      {(loggedinUser && loggedinUser.username === blog.user.username) && <button onClick={handleRemove}>remove</button>}
    </article>
  )
}

export default Blog
