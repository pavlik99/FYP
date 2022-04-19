import { OverlayTrigger, Popover, Col, Row, Container } from 'react-bootstrap'
import React from 'react'
////<i className={value >= 4 ? 'fa-solid fa-heart' : value >= 3.5 ? 'fa-solid fa-heart-pulse'  : 'fa-regular fa-heart'}></i>

const popover = (
  <Popover id='popover-basic'>
    <Popover.Header as='h3'>Tags</Popover.Header>
    <Popover.Body>
      <Container>
        <Row className='py-3'>
          <i className='fa-solid fa-seedling fa-lg py-1'> Vegan</i>
        </Row>
        <Row className='py-3'>
          <i className='fa-solid fa-leaf fa-lg py-1 '> Vegeterian</i>
        </Row>
        <Row className='py-3'>
          <i className='fa-solid fa-k fa-lg py-1 '> Keto</i>
        </Row>
        <Row className='py-3'>
          <i className='fa-solid fa-o fa-lg py-1 '> Organic</i>
        </Row>
      </Container>
    </Popover.Body>
  </Popover>
)

const PopOver = ({ product }) => (
  <OverlayTrigger trigger='hover' placement='right' overlay={popover}>
    <Row>
      <Col>
        <i
          className={
            product.isVegan === true ? 'fa-solid fa-seedling fa-lg px-1' : ''
          }
        ></i>
        <i
          className={
            product.isVegeterian === true ? 'fa-solid fa-leaf fa-lg px-1' : ''
          }
        ></i>
        <i
          className={product.isKeto === true ? 'fa-solid fa-k fa-lg px-1' : ''}
        ></i>
        <i
          className={
            product.isOrganic === true ? 'fa-solid fa-o fa-lg px-1' : ''
          }
        ></i>
      </Col>
    </Row>
  </OverlayTrigger>
)

export default PopOver
