import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Icons = () => {
  return (
    <Container>
      <Row className='py-3 my-2'>
        <Col className='text-center homeIcons'>
          {' '}
          <i class='fa-solid fa-tree'></i> ECO-FRIENDLY
        </Col>
        <Col className='text-center homeIcons'>
          <i class='fa-solid fa-recycle'></i> SUSTAINABLE
        </Col>
        <Col className='text-center homeIcons'>
          {' '}
          <i class='fa-solid fa-spa'></i> NATURAL
        </Col>
      </Row>
    </Container>
  )
}
export default Icons
