import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = (data) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(data)
      dispatch({
        type: 'NEW_BLOG',
        data: blog,
      })
    } catch (exception) {
      let message = exception.message
      const { data } = exception.response
      if (data.error === 'token expired') {
        message += ` - ${data.error}`
      }
      dispatch(setNotification(message, 'error'))
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default reducer
