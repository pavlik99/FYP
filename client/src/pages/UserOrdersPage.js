import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import StripeCheckout from 'react-stripe-checkout'
import { PAY_RESET } from '../constants/orders'

import {
  DELIVER_ORDER_MANAGER_RESTART,
  DISPATCH_ORDER_MANAGER_RESTART,
  CONFIRM_ORDER_MANAGER_RESTART,
} from '../constants/managerTypes'

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
import {
  deliverOrder,
  confirmOrder,
  dispatchOrder,
} from '../actions/managerActions'
import PopOver from '../components/PopOver'

const UserOrdersPage = (props) => {
  const orderId = props.match.params.id

  const dispatch = useDispatch()

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const getOrder = useSelector((state) => state.getOrder)
  const { order, loading } = getOrder

  const payOrder = useSelector((state) => state.payOrder)
  const { successPay } = payOrder

  const confirmOrderManager = useSelector((state) => state.confirmOrderManager)
  const { confirmed } = confirmOrderManager

  const dispatchOrderManager = useSelector(
    (state) => state.dispatchOrderManager
  )
  const { dispatched } = dispatchOrderManager

  const deliverOrderManager = useSelector((state) => state.deliverOrderManager)
  const { delivered } = deliverOrderManager

  useEffect(() => {
    if (!order || successPay || confirmed || dispatched || delivered) {
      dispatch({ type: PAY_RESET })
      dispatch({ type: CONFIRM_ORDER_MANAGER_RESTART })
      dispatch({ type: DISPATCH_ORDER_MANAGER_RESTART })
      dispatch({ type: DELIVER_ORDER_MANAGER_RESTART })
      dispatch(getOrderInfo(orderId))
    }
  }, [dispatch, orderId, order, confirmed, dispatched, delivered, successPay])

  const tokenHandler = (token) => {
    console.log({ token })
    console.log(token.email)

    dispatch(handleToken(token, orderId))
  }

  const confirmOrderHandler = () => {
    dispatch(confirmOrder(order))
  }

  const dispatchOrderHandler = () => {
    dispatch(dispatchOrder(order))
  }
  const deliverOrderHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <Row>
        <Col className='pt-3' md={8}>
          <Card className='pd-4'>
            <ListGroup variant='flush' className='orderFont2'>
              <ListGroupItem>
                <h3>ORDER DETAILS</h3>
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
              <ListGroupItem>
                Ordered on: {order.createdAt.substring(0, 10)}
              </ListGroupItem>
              <ListGroupItem>ORDER ID: {order._id}</ListGroupItem>
            </ListGroup>
          </Card>
          <ListGroup variant='flush' className='pt-2'>
            <ListGroupItem>
              <Row className='pr-3 orderFont'>
                <Col>
                  {order.isPaid ? (
                    <i class='fa-solid fa-check-double'></i>
                  ) : (
                    <i class='fa-solid fa-hand-holding-dollar'></i>
                  )}

                  {order.isPaid ? ' Successful Payment' : ' Complete Payment'}
                </Col>
                <Col>
                  {order.isConfirmed ? (
                    <i class='fa-regular fa-circle-check'> </i>
                  ) : (
                    <i class='fa-solid fa-circle-exclamation'></i>
                  )}{' '}
                  {order.isConfirmed ? ' Accepted' : 'Not accepted'}
                </Col>
                <Col>
                  <Col>
                    {order.isDispatched ? (
                      <i class='fa-solid fa-truck-fast'></i>
                    ) : (
                      <i class='fa-solid fa-plane-slash'></i>
                    )}{' '}
                    {order.isDispatched ? ' Dispatched' : ' Not dispatched'}{' '}
                  </Col>
                </Col>
                <Col>
                  {order.isDelivered ? (
                    <i class='fa-solid fa-house'> </i>
                  ) : (
                    <i class='fa-solid fa-circle-xmark'></i>
                  )}{' '}
                  {order.isDelivered ? ' Delivered' : ' Not delivered'}{' '}
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>

          {order.isPaid ? (
            ''
          ) : (
            <Alert variant='danger'>PLEASE COMPLETE PAYMENT</Alert>
          )}

          {order.isPaid ? (
            ' '
          ) : (
            <StripeCheckout
              name='Name of Website'
              description='Thank you for shopping with us!'
              stripeKey='pk_test_51Kob94BBFBRBiiwmsxSJqJClxNLgVLXaJ4RRCepN6D6QfdGHZEDTLLKZkeykEt9KLrnJP4rG42yG86X8PuqDWjRq00RnEy9C2O'
              token={tokenHandler}
              billingAddress
              amount={order.finalPrice * 100}
              currency='GBP'
            >
              <Button className='btn' variant='light' size='lg'>
                <i class='fa-solid fa-credit-card'></i> Pay with card
              </Button>
            </StripeCheckout>
          )}
        </Col>
        <Col className='pt-3 orderFont2' md={4}>
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
          {accountData.isManager && order.isPaid && (
            <ListGroup variant='flush' className='pt-4'>
              <ListGroupItem>
                <Row>
                  <Col>
                    <Button
                      className='btn pt-1'
                      variant='outline-dark'
                      onClick={confirmOrderHandler}
                    >
                      ACCEPT
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className='btn pt-1'
                      variant='outline-dark'
                      onClick={dispatchOrderHandler}
                    >
                      DISPATCH
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className='btn pt-1'
                      variant='outline-dark'
                      onClick={deliverOrderHandler}
                    >
                      DELIVER
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          )}
        </Col>
      </Row>
    </>
  )
}

export default UserOrdersPage
