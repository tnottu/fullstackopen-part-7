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
import { LinkContainer } from 'react-router-bootstrap'
import {
  Container,
  Navbar,
  Nav,
  Button
} from 'react-bootstrap'


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
      {!loggedinUser &&
        <Container>
          <Notification />
          <LoginForm />
        </Container>
      }

      {loggedinUser &&
        <>
          <Navbar bg="light" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Blog app</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <LinkContainer to="/">
                    <Nav.Link>Blogs</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/users">
                    <Nav.Link>Users</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
              <Navbar.Text>
                <span style={{ display: 'inline-block', marginRight: '1rem' }}>{loggedinUser.name} logged in</span>
                <Button variant="secondary" size="sm" type="button" onClick={() => dispatch(logout())}>Logout</Button>
              </Navbar.Text>
            </Container>
          </Navbar>

          <Container>
            <Notification />
            <Switch>
              <Route path="/users/:id">
                <User user={selectedUser} />
              </Route>
              <Route path="/users">
                <h1 className="my-4">Users</h1>
                <UserList />
              </Route>
              <Route path="/blogs/:id">
                <Blog blog={selectedBlog} />
              </Route>
              <Route path="/">
                <h1 className="my-4">Blogs</h1>
                <BlogList />
                <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                  <BlogForm { ...{ blogFormRef } } />
                </Togglable>
              </Route>
            </Switch>
          </Container>
        </>
      }
    </>
  )
}

export default App
