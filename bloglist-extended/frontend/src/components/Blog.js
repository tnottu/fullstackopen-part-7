import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import BlogCommentForm from './BlogCommentForm'
import {
  Container,
  Button,
  Table,
} from 'react-bootstrap'


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
    dispatch(setNotification(`Existing blog ${blog.title} by ${blog.author} updated`, 'success'))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user.name}?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotification(`Blog ${blog.title} by ${blog.author} deleted`, 'warning'))
      history.push('/')
    }
  }

  return (
    <Container className="my-4">
      <article>

        <h1>{blog.title}</h1>
        <p className="muted">by <strong>{blog.author}</strong></p>


        <Table bordered>
          <tbody>
            <tr>
              <td>URL:</td>
              <td><a href={blog.url} target="blank">{blog.url}</a></td>
            </tr>
            <tr>
              <td>Likes:</td>
              <td><span className="blog-likes-count">{blog.likes}</span></td>
            </tr>
            <tr>
              <td>Added by:</td>
              <td>{blog.user.name}</td>
            </tr>
          </tbody>
        </Table>

        <p>
          <Button variant="success" className="blog-like" onClick={handleLike}>Like</Button>
          {(loggedinUser && loggedinUser.username === blog.user.username) &&
            <Button variant="danger" className="ml-2 blog-remove" onClick={handleRemove}>Remove</Button>
          }
        </p>

        <h3 className="my-4">Comments</h3>

        <ul>
          {blog.comments.map(({ id, text }) => (
            <li key={id}>{text}</li>
          ))}
        </ul>

        <BlogCommentForm blog={blog} />

      </article>
    </Container>
  )
}

export default Blog
