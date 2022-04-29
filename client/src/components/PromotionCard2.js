import React from 'react'
import { Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PromotionCard2 = () => {
  return (
    <Card className='bg-white text-white my-3 rouned'>
      <Card.Img
        className='promotionImage'
        src='/images/organic.jpg'
        alt='Card image'
        width={300}
        height={350}
      ></Card.Img>
      <Card.ImgOverlay>
        <div className='pt-2 promotionText'>
          <Card.Title>Shop our Organic Range</Card.Title>
          <Link to={'/organicproducts'}>
            <Button className='btn' variant='outline-dark'>
              SHOP NOW
            </Button>
          </Link>
        </div>
      </Card.ImgOverlay>
    </Card>
  )
}

export default PromotionCard2
