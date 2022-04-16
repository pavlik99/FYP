import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import StripeCheckout from 'react-stripe-checkout'
import { PAY_RESET } from '../constants/orders'

import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  CardGroup,
  ListGroupItem,
  Alert,
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderInfo, handleToken } from '../actions/orders'
import PopOver from '../components/PopOver'

const UserOrdersPage2 = ({ match, history }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const getOrder = useSelector((state) => state.getOrder)
  const { order, loading, error } = getOrder

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch({ type: PAY_RESET })
      dispatch(getOrderInfo(orderId))
    }
  }, [dispatch, orderId, order])

  const tokenHandler = (token) => {
    console.log({ token })
    console.log(token.email)

    dispatch(handleToken(token, orderId))
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <h1>ORDER ID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <Card className='pd-2'>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>ORDER DETAILS</h3>
                {order.createdAt}
              </ListGroupItem>
              <ListGroupItem>
                {order.user.forename} {order.user.surname}
              </ListGroupItem>

              <ListGroupItem>{order.user.email}</ListGroupItem>

              <ListGroupItem>
                {order.deliveryAddress.deliveryAdress1}{' '}
              </ListGroupItem>
              <ListGroupItem>
                {order.deliveryAddress.town}, {order.deliveryAddress.zipCode}{' '}
              </ListGroupItem>
              <ListGroupItem>{order.deliveryAddress.county}, UK</ListGroupItem>
            </ListGroup>
          </Card>
          <ListGroup variant='flush' className='pt-2'>
            <ListGroupItem>
              <Row>
                <Col>
                  <Button className='btn pt-1' variant='outline-dark'>
                    TRACK ORDER
                  </Button>
                </Col>
                <Col>
                  <Button className='btn pt-1' variant='outline-dark'>
                    CANCEL ORDER
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>

          <h2>Payment</h2>
          {order.isPaid ? (
            <Alert variant='success'>Payment is completed!</Alert>
          ) : (
            <Alert variant='danger'>PLEASE COMPLETE PAYMENT</Alert>
          )}
          <StripeCheckout
            name='Name of Website'
            description='Thank you for shopping with us!'
            stripeKey='pk_test_51Kob94BBFBRBiiwmsxSJqJClxNLgVLXaJ4RRCepN6D6QfdGHZEDTLLKZkeykEt9KLrnJP4rG42yG86X8PuqDWjRq00RnEy9C2O'
            token={tokenHandler}
            billingAddress
            amount={order.finalPrice * 100}
            currency='usd'
          >
            <Button className='btn'>
              <i class='fa-solid fa-credit-card'> PAY</i>
            </Button>
          </StripeCheckout>
        </Col>
        <Col md={4}>
          <CardGroup variant='flush'>
            {order.productItems.map((item, index) => (
              <ListGroupItem key={index}>
                <Row>
                  <Col md={3}>
                    <Image src={item.productImage} fluid rounded />
                  </Col>
                  <Col>{item.title}</Col>
                  <Col>£{item.price}</Col>
                  <Col>
                    <PopOver product={item} />
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </CardGroup>
          <ListGroup className='pt-2'>
            <ListGroupItem>
              {order.deliveryPrice === 0
                ? 'Free Delivery'
                : `Delivery: £${order.deliveryPrice}`}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Total: </strong>£{order.finalPrice}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default UserOrdersPage2
