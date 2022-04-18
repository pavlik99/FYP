import React from 'react'
import { useEffect } from 'react'
import { Button, Row, Col, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MANAGER_NEW_PRODUCT_RESTART } from '../constants/managerTypes'

import Loading from '../components/Loading'
// Redux Actions
import { managerGetAllOrders } from '../actions/managerActions'

const OrdersManagerPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const getOrdersManager = useSelector((state) => state.getOrdersManager)
  const { orders, loading, received, error } = getOrdersManager

  useEffect(() => {
    dispatch({ type: MANAGER_NEW_PRODUCT_RESTART })
    if (!accountData) {
      history.push('/signin')
    } else {
      if (accountData && accountData.isManager) {
        dispatch(managerGetAllOrders())
      }
    }
  }, [dispatch, history, accountData])

  return (
    <>
      <Container className='pt-4' fluid>
        <Row>
          <Col>
            {loading ? (
              <Loading />
            ) : received ? (
              <Row>
                <ListGroup variant='flush'>
                  {orders.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col>{item.createdAt.substring(0, 10)}</Col>
                        <Col>
                          {item.user.forename} {item.user.surname}
                        </Col>
                        <Col>{item.total}</Col>

                        <Col>
                          <Link to={`/manager/order/${item._id}`}>
                            <Button variant='outline-dark'>DETAILS </Button>
                          </Link>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Row>
            ) : (
              error
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default OrdersManagerPage
