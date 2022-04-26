import { OverlayTrigger, Popover, Col, Row, Container } from 'react-bootstrap'
import React from 'react'

const popover = (
  <Popover id='popover-basic'>
    <Popover.Header as='h3'>INFORMATION</Popover.Header>
    <Popover.Body>
      <Container>
        <Row className='pt-1'>
          <Col>
            <img alt='tags' className='px-1' src='/images/letter-v2.png'></img>{' '}
            <strong>Vegan</strong>
          </Col>
        </Row>
        <Row className='pt-1'>
          <Col>
            <img alt='tags' className='px-1' src='/images/letter-v.png' />{' '}
            <strong>Vegetarian</strong>
          </Col>
        </Row>
        <Row className='pt-1'>
          <Col>
            <img alt='tags' className='px-1' src='/images/letter-k.png'></img>{' '}
            <strong>Keto</strong>
          </Col>
        </Row>
        <Row className='pt-1'>
          <Col>
            <img alt='tags' className='px-1' src='/images/letter-o.png' />{' '}
            <strong>Organic</strong>
          </Col>
        </Row>
      </Container>
    </Popover.Body>
  </Popover>
)

const PopOver = ({ product }) => (
  <OverlayTrigger trigger='hover' placement='right' overlay={popover}>
    <Row>
      <Col>
        {product.isVegeterian && (
          <img
            alt='tags'
            className='px-1'
            src={product.isVegeterian === true && '/images/letter-v.png'}
          />
        )}
        {product.isVegan && (
          <img
            alt='tags'
            className='px-1'
            src={product.isVegan === true ? '/images/letter-v2.png' : ' '}
          />
        )}
        {product.isKeto && (
          <img
            alt='tags'
            className='px-1'
            src={product.isKeto === true ? '/images/letter-k.png' : ' '}
          />
        )}
        {product.isOrganic && (
          <img
            alt='tags'
            className='px-1'
            src={product.isOrganic === true ? '/images/letter-o.png' : ' '}
          />
        )}
      </Col>
    </Row>
  </OverlayTrigger>
)

export default PopOver
