import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

import {
  Form,
  Button,
  Card,
} from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  const cardStyle = {
    maxWidth: '24rem',
    margin: '4rem auto',
  }

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <h2>Log in to application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button type="submit" id="login-button">login</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default LoginForm



