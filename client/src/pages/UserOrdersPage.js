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
import { useHistory, useLocation } from 'react-router-dom'

import { getOrder } from '../actions/orders'

const UserOrdersPage = () => {
  const dispatch = useDispatch()
  const orderID = props.match.params.id

  const getOrderData = useSelector((state) => state.getOrder)
  const { order, recieved, loading } = getOrderData

  useEffect(() => {
    dispatch(getOrder(orderID))
  })

  return (
    <>
      <Row>
        <Col md={4} className='pt-4'>
          <Row>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>Delivery Address</ListGroupItem>
                <ListGroupItem>
                  {order.deliveryAdress.deliveryAdress1}
                </ListGroupItem>
                <ListGroupItem>{order.deliveryAdress.town}</ListGroupItem>
                <ListGroupItem>{order.deliveryAdress.zipCode}</ListGroupItem>
                <ListGroupItem>{order.deliveryAdress.county}</ListGroupItem>
              </ListGroup>
            </Card>
          </Row>
          <Row className='pt-4'>
            <Card className='pt-2'>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Subtotal</Col>
                    <Col>{order.productsTotal}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Delivery</Col>
                    <Col>
                      {order.deliveryPrice === 0 ? 'Free Delivery' : ''}{' '}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Final Price</Col>
                    <Col>{order.total}</Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </>
  )
}

export default UserOrdersPage
