import React from 'react'
import { useSelector } from 'react-redux'

import {
  Alert,
} from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  const { text, variant } = notification

  return (
    <Alert variant={variant || 'primary'} className="my-4">
      {text}
    </Alert>
  )
}

export default Notification
