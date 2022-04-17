import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Row, Col, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

// Redux Actions
import { getAccountInfo } from '../actions/authActions'
import { getOrdersAction } from '../actions/orders'

const AccountPage = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  // const [message, setMessage] = useState(null)

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const getOrders = useSelector((state) => state.getOrders)
  const { orders } = getOrders

  const accountInfo = useSelector((state) => state.accountInfo)
  const { loading, account, error } = accountInfo

  const updateInfo = useSelector((state) => state.updateInfo)
  const { success } = updateInfo

  useEffect(() => {
    if (!accountData) {
      history.push('/signin')
    } else {
      if (!account.forename) {
        dispatch(getAccountInfo('allOrders'))
        dispatch(getOrdersAction())
      }
    }
  }, [dispatch, history, accountData, account])

  return (
    <>
      <Container className='pt-4' fluid>
        <Row>
          <Col>
            <ListGroup variant='flush'>
              {orders.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col>{item.createdAt.substring(0, 10)}</Col>
                    <Col></Col>
                    <Col></Col>

                    <Col>
                      <Link to={`/orders/${item._id}`}>
                        <Button variant='outline-dark'>DETAILS </Button>
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

export default AccountPage
