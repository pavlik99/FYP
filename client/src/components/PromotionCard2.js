import React from 'react'
import { Card, Button} from 'react-bootstrap'

const PromotionCard2 = () => {
  return (
    <Card className="bg-white text-white my-3 rouned" >
  <Card.Img src='/images/promotion2.jpg' alt="Card image" />
  <Card.ImgOverlay>
  <div className='pt-5'>
    <Card.Title>Card title</Card.Title>
    <Card.Text>
      This is a wider card with
    </Card.Text>
    <Card.Text className='pb-2'>Last updated 3 mins ago</Card.Text>
    <Button className='btn' variant="outline-light">SHOP NOW</Button>
    </div>
  </Card.ImgOverlay>
</Card>

  )
}

export default PromotionCard2