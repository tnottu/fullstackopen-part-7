import React from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const blogsSorted = [...blogs].sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  const blogsToShow = blogsSorted

  return (
    <div>
      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default BlogList
