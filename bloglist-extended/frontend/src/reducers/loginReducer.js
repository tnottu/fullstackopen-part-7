import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const LOGIN_DETAILS_STORAGE_KEY = 'loggedBloglistappUser'
const initialState = {
  user: null,
}

const reducer = (state = initialState, { type, data }) => {
  switch(type) {
  case 'LOGIN':
    return {
      ...state,
      user: data,
    }
  case 'LOGOUT':
    return {
      ...state,
      user: null,
    }
  default:
    return state
  }
}

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        LOGIN_DETAILS_STORAGE_KEY, JSON.stringify(user)
      )

      dispatch({
        type: 'LOGIN',
        data: user,
      })

      blogService.setToken(user.token)
    } catch (exception) {
      console.error('Wrong credentials')
      dispatch(setNotification('Wrong username or password', 'danger'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(LOGIN_DETAILS_STORAGE_KEY)
    blogService.setToken('')
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const initializeLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem(LOGIN_DETAILS_STORAGE_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
      blogService.setToken(user.token)
    }
  }
}

export default reducer
