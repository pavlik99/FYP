import React from 'react'
import { Carousel } from 'react-bootstrap'
const CarouselElement = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={9000}>
          <img
            className='d-block w-100'
            src='/images/c1.jpg'
            alt='First slide'
            width={400}
            height={500}
          />
          <Carousel.Caption>
            <h3 className='promotionText'>Cows scream louder than carrots.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={9000}>
          <img
            className='d-block w-100'
            src='/images/c5.jpg'
            alt='Second slide'
            width={400}
            height={500}
          />
          <Carousel.Caption>
            <h3 className='promotionText'>
              The act of putting into your mouth what the earth has grown is
              perhaps your most direct interaction with the earth.
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={9000}>
          <img
            className='d-block w-100'
            src='/images/carousel4.jpg'
            alt='Third slide'
            width={400}
            height={500}
          />
          <Carousel.Caption>
            <h3 className='promotionText'>
              Vegan is just pure love. Love for animals, love for the planet,
              and love for yourself
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default CarouselElement
