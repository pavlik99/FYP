import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PromotionCard = () => {
  return (
    <Card className='bg-white text-white my-3 rouned'>
      <Card.Img
        className='promotionImage'
        src='/images/vegan.png'
        alt='Card image'
        width={300}
        height={350}
      ></Card.Img>
      <Card.ImgOverlay>
        <div className='pt-2 promotionText'>
          <Card.Title>Shop our Vegan Range</Card.Title>
          <Link to={'/veganproducts'}>
            <Button className='btn' variant='outline-dark'>
              SHOP NOW
            </Button>
          </Link>
        </div>
      </Card.ImgOverlay>
    </Card>
  )
}

export default PromotionCard
