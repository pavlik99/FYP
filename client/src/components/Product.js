import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Reviews from './Reviews'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Card className='my-3  rounded' style={{ width: '18rem' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className='rounded-top'
          variant='top'
          height={250}
          width={300}
          rounded
          src={product.productImage}
        />
      </Link>
      <Card.Body>
        <Card.Title as='div'>{product.title}</Card.Title>

        <Card.Text as='div'>
          <Reviews
            value={product.review}
            text={`(${product.numReviews} reviews)`}
          />
        </Card.Text>
        <Card.Text as='h6'> £{product.price}</Card.Text>
        <div className='text-center'>
          <Link to={`/product/${product._id}`}>
            <Button className='btn' variant='outline-dark'>
              VIEW PRODUCT
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product
