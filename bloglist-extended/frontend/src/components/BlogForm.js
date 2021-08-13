import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import {
  Form,
  Button,
  Card,
} from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    dispatch(createBlog(blog))
    dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} added`, 'success'))

    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const cardStyle = {
    maxWidth: '24rem',
    margin: '2rem 0',
  }


  return (
    <Card style={cardStyle}>
      <Card.Header as="h3">
        Create new blog
      </Card.Header>
      <Card.Body>
        <Form onSubmit={addBlog} className="blog-form">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="url"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>
          <Button type="submit">Create</Button>
          <Button variant="secondary" className="ml-2" type="button" onClick={() => blogFormRef.current.toggleVisibility()}>Cancel</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default BlogForm
