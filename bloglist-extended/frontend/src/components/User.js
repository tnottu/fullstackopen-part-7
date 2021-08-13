import React from 'react'
import BlogList from './BlogList'

const User = ({ user }) => {
  if (!user) return null

  return (
    <>
      <h1 className="my-4">{user.name}</h1>
      <h2 className="my-4">Added blogs</h2>
      <BlogList userFilter={user} />
    </>
  )
}

export default User
