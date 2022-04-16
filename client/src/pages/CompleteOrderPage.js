import React from 'react'
import { useEffect } from 'react'
import {
  Col,
  Row,
  Button,
  ListGroup,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { orderCreate } from '../actions/orders'

const CompleteOrderPage = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const basket = useSelector((state) => state.basket)
  const createOrder = useSelector((state) => state.createOrder)
  const { order, created, loading } = createOrder

  //Total price for all the prodcuts in the basket
  basket.productsTotal = basket.basketItems
    .reduce(
      (acc, currentItem) => acc + currentItem.quantity * currentItem.price,
      0
    )
    .toFixed(2)
  // Price for the delivery
  basket.deliveryPrice = basket.productsTotal > 50 ? 0 : 4.99
  // Final price
  basket.total = Number(
    Number(basket.productsTotal) + Number(basket.deliveryPrice)
  ).toFixed(2)

  const completeOrder = () => {
    dispatch(
      orderCreate({
        productItems: basket.basketItems,
        deliveryAddress: basket.deliveryAdress,
        productsTotal: basket.productsTotal,
        deliveryPrice: basket.deliveryPrice,
        finalPrice: basket.total,
      })
    )
  }

  useEffect(() => {
    if (created) {
      history.push(`/orders/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, created])

  return (
    <>
      <Row>
        <Col md={4} className='pt-4'>
          <Row>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>Delivery Address</ListGroupItem>
                <ListGroupItem>
                  {basket.deliveryAdress.deliveryAdress1}
                </ListGroupItem>
                <ListGroupItem>{basket.deliveryAdress.town}</ListGroupItem>
                <ListGroupItem>{basket.deliveryAdress.zipCode}</ListGroupItem>
                <ListGroupItem>{basket.deliveryAdress.county}</ListGroupItem>
              </ListGroup>
            </Card>
          </Row>
          <Row className='pt-4'>
            <Card className='pt-2'>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Subtotal</Col>
                    <Col>£{basket.productsTotal}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Delivery</Col>
                    <Col>
                      {basket.deliveryPrice === 0
                        ? 'Free Delivery'
                        : `£${basket.deliveryPrice}`}{' '}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Final Price</Col>
                    <Col>£{basket.total}</Col>
                  </Row>
                </ListGroupItem>
                <>
                  <ListGroupItem></ListGroupItem>
                  <Button variant='outline-dark' onClick={completeOrder}>
                    Complete Order
                  </Button>
                  <ListGroupItem></ListGroupItem>
                </>
              </ListGroup>
            </Card>
          </Row>
        </Col>
        <Col>RECCOMEND MORE PRODUCTS OR BLOGS</Col>
      </Row>
    </>
  )
}

export default CompleteOrderPage
