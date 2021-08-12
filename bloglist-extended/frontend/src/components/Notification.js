import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  const { text, variant } = notification

  return (
    <div className={variant || 'notification'}>
      {text}
    </div>
  )
}

export default Notification
