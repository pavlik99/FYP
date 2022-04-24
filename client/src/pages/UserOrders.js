import React from 'react'
import { useState, useEffect } from 'react'
import {
  Button,
  Row,
  Col,
  Form,
  Container,
  Alert,
  ListGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading'
// Redux Actions
import { getAccountInfo } from '../actions/authActions'
import { getOrdersAction } from '../actions/orders'

const UserOrders = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const accountInfo = useSelector((state) => state.accountInfo)
  const { loading, account } = accountInfo

  const getOrders = useSelector((state) => state.getOrders)
  const { orders } = getOrders

  const getUserRecipes = useSelector((state) => state.getUserRecipes)
  const { recipes } = getUserRecipes

  useEffect(() => {
    if (!accountData) {
      history.push('/signin')
    } else {
      if (!account.forename) {
        // dispatch(getAccountInfo('profile'))
        dispatch(getOrdersAction())
      }
    }
  }, [dispatch, history, accountData, account])

  return (
    <>
      {loading && <Loading />}

      <Container className='pt-4' fluid>
        <Row>
          <Col>
            <ListGroup variant='flush'>
              {orders.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col>{item.createdAt.substring(0, 10)}</Col>
                    <Col>
                      {' '}
                      {item.isConfirmed ? (
                        <i class='fa-regular fa-circle-check'> </i>
                      ) : (
                        <i class='fa-solid fa-circle-exclamation'></i>
                      )}{' '}
                      {item.isConfirmed ? ' Accepted' : 'Not accepted'}
                    </Col>
                    <Col>
                      {item.isDispatched ? (
                        <i class='fa-solid fa-truck-fast'></i>
                      ) : (
                        <i class='fa-solid fa-plane-slash'></i>
                      )}{' '}
                      {item.isDispatched ? ' Dispatched' : ' Not dispatched'}{' '}
                    </Col>
                    <Col>
                      {item.isDelivered ? (
                        <i class='fa-solid fa-house'> </i>
                      ) : (
                        <i class='fa-solid fa-circle-xmark'></i>
                      )}{' '}
                      {item.isDelivered ? ' Delivered' : ' Not delivered'}{' '}
                    </Col>
                    <Col>
                      <Link to={`/orders/${item._id}`}>
                        <Button variant='outline-dark' size='sm'>
                          DETAILS{' '}
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserOrders
