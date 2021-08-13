import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'ADD_LIKE':
  case 'ADD_COMMENT':
    return [...state].map((item) => item.id === action.data.id
      ? action.data
      : item)
  case 'REMOVE_BLOG':
    return [...state].filter((item) => item.id !== action.data.id)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

const getExceptionMessage = (exception) => {
  let message = exception.message
  const { data } = exception.response || {}
  if (data && data.error) {
    message += ` - ${data.error}`
  }
  return message
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const data = await blogService.create(blog)
      dispatch({
        type: 'CREATE_BLOG',
        data,
      })
    } catch (exception) {
      dispatch(setNotification(getExceptionMessage(exception), 'danger'))
    }
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    try {
      const data = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch({
        type: 'ADD_LIKE',
        data,
      })
    } catch (exception) {
      dispatch(setNotification(getExceptionMessage(exception), 'danger'))
    }
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    try {
      const data = await blogService.createComment(blog, comment)
      dispatch({
        type: 'ADD_COMMENT',
        data,
      })
    } catch (exception) {
      dispatch(setNotification(getExceptionMessage(exception), 'danger'))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog,
      })
    } catch (exception) {
      dispatch(setNotification(getExceptionMessage(exception), 'danger'))
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data,
    })
  }
}

export default reducer
