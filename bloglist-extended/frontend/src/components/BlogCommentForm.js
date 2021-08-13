import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import {
  Button,
  Form,
} from 'react-bootstrap'

const BlogCommentForm = ({ blog }) => {

  const dispatch = useDispatch()
  const comment = useField('text')

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment.attrs.value))
    comment.reset()
  }

  return (
    <Form onSubmit={handleComment}>
      <Form.Group>
        <Form.Label>Add a comment...</Form.Label>
        <Form.Control { ...comment.attrs } />
      </Form.Group>
      <Button type="submit">Add comment</Button>
    </Form>
  )
}

export default BlogCommentForm
