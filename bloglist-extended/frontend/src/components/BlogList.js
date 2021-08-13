import React from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
  ListGroup
} from 'react-bootstrap'

const BlogList = ({ userFilter }) => {
  const blogs = useSelector(state => state.blogs)
  const blogsSorted = [...blogs].sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  const blogsByUser = [...blogs].filter((blog) => userFilter && blog.user.id === userFilter.id)
  const blogsToShow = userFilter
    ? blogsByUser
    : blogsSorted

  return (
    blogsToShow.length
      ? <ListGroup className="my-4">
        {blogsToShow.map(blog =>
          <LinkContainer key={blog.id} to={`/blogs/${blog.id}`} className="blog">
            <ListGroup.Item as="a">
              <>
                <strong className="blog-title">{blog.title}</strong>
                <small className="text-muted d-inline-block ml-2">by <strong>{blog.author}</strong></small>
              </>
            </ListGroup.Item>
          </LinkContainer>
        )}
      </ListGroup>
      : <p>No blogs to show</p>
  )
}

export default BlogList
