import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, initializeLogin } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const loggedinUser = useSelector(state => state.login.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeLogin())
    dispatch(initializeUsers())
  }, [dispatch])

  const selectedUserMatch = useRouteMatch('/users/:id')
  const selectedUser = selectedUserMatch
    ? users.find(user => user.id === selectedUserMatch.params.id)
    : null

  const selectedBlogMatch = useRouteMatch('/blogs/:id')
  const selectedBlog = selectedBlogMatch
    ? blogs.find(blog => blog.id === selectedBlogMatch.params.id)
    : null

  return (
    <>
      <Notification />

      {!loggedinUser &&
        <LoginForm />
      }

      {loggedinUser &&
        <div>
          <h2>blogs</h2>
          <p>{loggedinUser.name} logged in <button type="button" onClick={() => dispatch(logout())}>Logout</button></p>

          <Switch>
            <Route path="/users/:id">
              <User user={selectedUser} />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/blogs/:id">
              <Blog blog={selectedBlog} />
            </Route>
            <Route path="/">
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm { ...{ blogFormRef } } />
              </Togglable>
              <BlogList />
            </Route>
          </Switch>
        </div>
      }
    </>
  )
}

export default App
