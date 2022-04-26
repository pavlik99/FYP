import React from 'react'
import { Card, Button, Image, Col, Row, Container } from 'react-bootstrap'
import Reviews from './Reviews'
import { Link } from 'react-router-dom'

const ProductsRecommnedation = ({ product }) => {
  return (
    <>
      <Container fluid className='pt-3'>
        <Row>
          <Col className='pb-2'>
            <Link to={product._id}>
              <img
                src={product.productImage}
                height={250}
                width={250}
                className='homeImage'
                alt=''
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductsRecommnedation
