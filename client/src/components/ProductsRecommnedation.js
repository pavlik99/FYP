import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Reviews from './Reviews'
import { Link } from 'react-router-dom'


const ProductsRecommnedation = ({product}) => {
  return (
    
    <>
     
    <Card className='my-3  rounded' style={{ width: '18rem' }} > 
    <Link to={`/product/${product._id}`}> 
    <Card.Img  className='rounded-top'variant="top" src={product.productImage} />
    </Link>
    <Card.Body>
    <Link to={`/product/${product._id}`}>
        <Card.Title as='div' >{product.title}</Card.Title>
    </Link>
        <Card.Text as='div'>
       <Reviews value={product.review} text={`(${product.numReviews} reviews)`} />
        </Card.Text>
        <Card.Text as='h6'> £{product.price}</Card.Text>
        <div className="text-center">
        <Button className='btn' variant="primary">ADD TO BASKET</Button>
        </div>
    </Card.Body>
</Card>

</>
  )
}

export default ProductsRecommnedation