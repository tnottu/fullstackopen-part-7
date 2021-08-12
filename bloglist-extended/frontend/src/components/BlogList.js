import React from 'react'
import { useSelector } from 'react-redux'

import {
  Link,
} from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const blogsSorted = [...blogs].sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  const blogsToShow = blogsSorted

  const blogItemStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogsToShow.map(blog =>
        <div key={blog.id} style={blogItemStyle} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList
