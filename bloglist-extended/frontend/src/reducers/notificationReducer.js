let timeoutID

const reducer = (state = null, { type, data }) => {
  switch(type) {
  case 'SET_NOTIFICATION':
    return data
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const setNotification = (text, variant, timeout = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        text,
        variant,
      },
    })
    dispatch(clearNotification(timeout))
  }
}

export const clearNotification = (timeout = 0) => {
  return async (dispatch) => {
    clearTimeout(timeoutID)
    await new Promise((resolve) => {
      timeoutID = setTimeout(resolve, timeout * 1000)
    })
    dispatch({
      type: 'CLEAR_NOTIFICATION',
    })
  }
}

export default reducer
