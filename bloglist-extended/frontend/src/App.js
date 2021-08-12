import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, initializeLogin } from './reducers/loginReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeLogin())
  }, [dispatch])

  return (
    <>
      <Notification />

      {!user &&
        <LoginForm />
      }

      {user &&
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button type="button" onClick={() => dispatch(logout())}>Logout</button></p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm { ...{ blogFormRef } } />
          </Togglable>

          <BlogList />
        </div>
      }
    </>
  )
}

export default App
