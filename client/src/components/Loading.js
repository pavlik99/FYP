import React from 'react'
import { Spinner, Button } from 'react-bootstrap'

const Loading = () => {
  return (
    <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="visually-hidden">Loading...</span>
  </Button>
  )
}

export default Loading